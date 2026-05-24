import BaseWidget from 'widgets/BaseWidget';

class Combobox extends BaseWidget {

  constructor(valOrObject, callbackOrKey, options) {
    super();

    var value = this._getInitialValue(valOrObject, callbackOrKey);
    var callback = this._getCheckCallback(valOrObject, callbackOrKey);
    options = options || {};
    value = value !== undefined ? value : options[0];

    this.isArray = options.length !== undefined;

    this.domSelect = document.createElement('select');
    this.domSelect.className = 'gui-select';
    this.addOptions(options);

    this.domSelect.addEventListener('change', this._onChange.bind(this));
    this.setValue(value);
    this.setCallback(callback);
  }

  _parseValue(val) {
    return this.isArray ? parseInt(val, 10) : val;
  }

  _onChange(ev) {
    this.setValue(ev.target.value);
  }

/*

Image options example:
ex: options = { "options_array": [ {"text": "my text 1", "image": "my image 1"}, {"text": "my text 2", "image": "my image 2"} ]};

for (let key in options.options_array) {
    console.log(`Key: ${key}, Text: ${options.options_array[key].text}, Image: ${options.options_array[key].image}`);
}

*/
  addOptions(options) {
    if (this.isArray) {
      var keys = Object.keys(options);
      for (var i = 0; i < keys.length; ++i) {
        var opt = document.createElement('option');
        opt.innerHTML = options[keys[i]];
        opt.value = keys[i];
        this.domSelect.appendChild(opt);
      }
      return;
    }

    // image Combobox
    console.log("Image Combobox");
    for (let key in options.options_array) {
      console.log(`Key: ${key}, Text: ${options.options_array[key].text}, Image: ${options.options_array[key].image}`);
      var opt = document.createElement('option');
      opt.innerHTML = `${options.options_array[key].text}`; //options[keys[i]];
      opt.value = `${key}`; //keys[i];
      this.domSelect.appendChild(opt);
    }
  }

  setValue(val, ignoreCB) {
    this.domSelect.value = val;
    if (!ignoreCB && this.callback) this.callback(this._parseValue(val));
  }

  getValue() {
    return this._parseValue(this.domSelect.value);
  }
}

export default Combobox;
