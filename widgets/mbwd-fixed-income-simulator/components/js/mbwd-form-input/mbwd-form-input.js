// eslint-disable-next-line
const MBWD_FORM_INPUT = () => ({
  template: `
    <div class="mbwd-form-input-wrapper" :id="id">
      <label :class="cssInputLabel">{{label}}</label>
      <div class="input-wrapper">
        <span v-if="prefix" class="prefix">{{prefix}}</span>
        <input ref="input" :class="cssInputState" :readonly="readOnly" :disabled="disabled" :type="inputType" :maxlength="maxLength" :placeholder="placeholder" :autofocus="autofocus" @focus="onFocus" @blur="executeBlurCallbackAndValidateField" @keyup="validateAndSetValue" v-model="inputValue"/>
        <span v-if="suffix" class="suffix">{{suffix}}</span>
      </div>
      <label v-if="showHint" class="hint">{{hintText}}</label>
      <label v-if="statusError" class="errorMessage">{{errorMessage}}</label>
    </div>
  `,
  props: {
    aditionalClass: {
      type: String,
      default: '',
    },
    blurCallback: {
      type: Function,
      default() {},
    },
    clearRuleRegex: {
      type: [String, RegExp],
      default: null,
    },
    displayClearInputButton: {
      type: Boolean,
      default: true,
    },
    displayInputRequirement: {
      type: [Boolean],
      default: false,
    },
    emptyError: {
      type: String,
      default: null,
    },
    disabled: {
      type: [String, Boolean],
      default: false,
    },
    hintText: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    mask: {
      type: [String, Boolean],
      default: false,
    },
    maskCallback: {
      type: [String, Function],
      default: null,
    },
    maxLength: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    preventBackSpace: {
      type: [String, Boolean],
      default: true,
    },
    readOnly: {
      type: [String, Boolean],
      default: false,
    },
    required: {
      type: [String, Boolean],
      default: true,
    },
    status: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
      required: false,
    },
    validateCallback: {
      type: [String, Function],
      default: null,
    },
    validationRegex: {
      type: RegExp,
      default: null,
    },
    validationRegexError: {
      type: String,
      default: null,
    },
    valid: {
      type: [String, Boolean],
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
  },
  data() {
    return {
      inputValue: this.value,
      active: false,
      inputValid: this.valid,
      inputType: this.type,
      errorMessage: '',
      isPassword: false,
      statusField: this.status,
    }
  },
  computed: {
    cssInputState: function () {
      return [
        {
          active: this.active || (this.value !== '' && this.statusField === ''),
          disabled: this.disabled && this.paramValueIsTrue(this.disabled),
          error: this.statusField === 'error',
          ok: this.statusField === 'ok',
        },
      ]
    },
    cssInputLabel: function () {
      return {
        required: this.displayInputRequirement && this.required,
        'item-is-empty': !this.inputValue && !this.active,
      }
    },
    statusError: function () {
      return this.statusField === 'error'
    },
    showHint: function () {
      return !this.statusError && this.hintText !== '' && !this.valid
    },
    displayShowPassAction: function () {
      return this.value !== '' && this.isPassword
    },
    statusOk: function () {
      return this.statusField === 'ok'
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue
    },
    valid(newValue) {
      this.inputValid = newValue
      this.validateField()
    },
  },
  methods: {
    executeBlurCallbackAndValidateField() {
      if (this.blurCallback) {
        this.blurCallback(this.inputValue)
      }

      Vue.nextTick(() => {
        this.validateField()
      })
    },
    clearField() {
      this.inputValue = ''
      this.statusField = ''
      this.errorMessage = ''
      this.$emit('update:value', this.inputValue)
    },
    paramValueIsTrue(value) {
      return value === true || value === 'true'
    },
    validateField() {
      this.errorMessage = this.validate()
      this.inputValid = !(
        this.errorMessage &&
        (this.errorMessage !== '' || this.errorMessage !== null)
      )
      this.$emit('update:valid', this.inputValid)
      this.active = false
      if (!this.readOnly) {
        if (this.errorMessage) {
          this.statusField = 'error'
          return false
        } else {
          this.statusField = ''
        }
      }
      return true
    },
    focus() {
      this.$refs.input?.focus()
    },
    onFocus() {
      this.active = true
    },
    validateAndSetValue(e) {
      if (this.clearRuleRegex) {
        this.inputValue = this.inputValue?.replace(
          new RegExp(this.clearRuleRegex, 'gi'),
          ''
        )
      }

      if (
        !(e.keyCode === 8 && this.preventBackSpace) &&
        this.paramValueIsTrue(this.mask)
      ) {
        this.inputValue = this.maskField(e)
      }

      this.$emit('update:value', this.inputValue)
    },
    maskField(e) {
      if (!(e.keyCode === 8 && this.preventBackSpace) && this.maskCallback) {
        return this.maskCallback(this.inputValue)
      }

      return this.inputValue
    },
    validate() {
      if (this.paramValueIsTrue(this.required)) {
        if (this._valueIsEmpty()) {
          return this.emptyError
        }
        if (this.validationRegex && !this._isValid()) {
          return this.validationRegexError
        }
      }
      return false
    },
    _valueIsEmpty() {
      return this.inputValue === ''
    },
    _isValid() {
      if (this.validateCallback) {
        if (!this.validateCallback(this.inputValue)) {
          return false
        }
      }

      if (
        typeof this.validationRegex === 'string' ||
        typeof this.validationRegex === 'object'
      ) {
        return this.validationRegex.test(this.inputValue)
      }

      return true
    },
  },
  created() {
    this.isPassword = this.inputType === 'password'
  },
})
