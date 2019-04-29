/*!
* tueble v1.5.1
* (c) 2019 Marcos Freire
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Tueble = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function pick(obj, keys) {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(keys.map(function (k) {
      return k in obj ? _defineProperty({}, k, obj[k]) : {};
    }))));
  }

  var Column = function Column(vueColumnComponent) {
    _classCallCheck(this, Column);

    var properties = pick(vueColumnComponent, ['show', 'sortable', 'filterable', 'columnClass', 'label', 'index', 'highlight', 'columnHeaderClass']);

    for (var property in properties) {
      this[property] = vueColumnComponent[property];
    }

    if (this.index) {
      this.sortable = false;
      this.filterable = false;
      this.highlight = false;
    }

    this.isActive = false;
    this.sortOrder = 1;
    this.template = vueColumnComponent.$scopedSlots.default;
  };

  var TextFilter =
  /*#__PURE__*/
  function () {
    function TextFilter(filterText, filterMinSize) {
      _classCallCheck(this, TextFilter);

      this.filterText = filterText;
      this.filterMinSize = filterMinSize;
    }

    _createClass(TextFilter, [{
      key: "isValid",
      value: function isValid() {
        return typeof this.filterText == 'string' && this.filterText.length >= this.filterMinSize;
      }
    }]);

    return TextFilter;
  }();

  var DomainFilter =
  /*#__PURE__*/
  function () {
    function DomainFilter(vueColumnComponent) {
      _classCallCheck(this, DomainFilter);

      var properties = pick(vueColumnComponent, ['filterBy', 'filterColumn']);

      for (var property in properties) {
        this[property] = vueColumnComponent[property];
      }
    }

    _createClass(DomainFilter, [{
      key: "isValid",
      value: function isValid() {
        return this.filterBy.constructor === Array && this.filterBy.length > 0 && typeof this.filterColumn == 'string';
      }
    }]);

    return DomainFilter;
  }();

  var BaseCell = {
    name: 'BaseCell',
    functional: true,
    props: {
      column: {
        type: Object,
        required: true
      },
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      },
      textSearch: {
        type: String,
        required: false
      }
    },
    render: function render(createElement, _ref) {
      var props = _ref.props;
      var data = {};

      if (props.column.columnClass) {
        data.class = props.column.columnClass;
      }

      if (!props.column.index && props.column.template) {
        return createElement('td', data, props.column.template(props.rowData));
      }

      data.domProps = {};

      var highlight = function highlight(text, query) {
        if (!query) {
          return text;
        }

        if (!text) return '';
        return text.toString().replace(new RegExp(query, "gi"), function (match) {
          return '<span class="highlight">' + match + '</span>';
        });
      };

      var innerHTML = props.column.index ? props.rowIndex + 1 : props.column.highlight ? highlight(props.rowData[props.column.show], props.textSearch) : props.rowData[props.column.show];
      data.domProps.innerHTML = innerHTML;
      return createElement('td', data);
    }
  };

  //
  var script = {
    name: 'BaseRow',
    components: {
      BaseCell: BaseCell
    },
    props: {
      /**
       * Table row number
       * @required true
       * @type {Number}
       */
      rowIndex: {
        required: true,
        type: Number
      },

      /**
       * Columns to be rendered
       * @required true
       * @type {Object}
       */
      columns: {
        required: true,
        type: Array
      },

      /**
       * Data to be rendered as table row
       * @required true
       * @type {Number}
       */
      rowData: {
        required: true,
        type: Object
      },

      /**
       * Term used to filter the table. Applies only to columns with the
       * filterable property enabled.
       * @type {String}
       *
       */
      filterText: {
        required: false,
        type: String,
        default: ''
      }
    },
    computed: {
      showData: function showData() {
        return this;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',_vm._l((_vm.columns),function(column){return _c('BaseCell',{key:column.id,attrs:{"column":column,"row-data":_vm.rowData,"row-index":_vm.rowIndex,"text-search":_vm.filterText}})}))};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var BaseRow = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  var script$1 = {
    name: 'BaseColumnHeader',
    props: {
      /**
       * Column object
       * @required true
       * @type {Number}
       */
      column: {
        required: true,
        type: Object
      },
      columnIndex: {
        type: Number
      }
    },
    computed: {
      classNames: function classNames() {
        return this.column.columnHeaderClass + (this.column.isActive ? ' header-active' : '') + (this.column.index ? ' header-index' : '');
      },
      sortIcon: function sortIcon() {
        return this.column.sortOrder == 1 ? '&#9660;' : '&#9650;';
      }
    },
    methods: {
      clickAction: function clickAction() {
        if (!this.column.index) this.$emit('sortUpdate', this.columnIndex);
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{class:_vm.classNames,on:{"click":_vm.clickAction}},[_vm._v("\n  "+_vm._s(_vm.column.label)+"\n  "),(_vm.column.isActive)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.sortIcon)}}):_vm._e()])};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var BaseColumnHeader = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  var FilterEngine =
  /*#__PURE__*/
  function () {
    function FilterEngine() {
      _classCallCheck(this, FilterEngine);
    }

    _createClass(FilterEngine, [{
      key: "filterArray",
      value: function filterArray(array, sortBy, sortOrder, columns, textFilter) {
        var domainFilters = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
        var filterableColumns = this.pluck(columns.filter(function (column) {
          return column.filterable;
        }), 'show');

        if (textFilter.isValid()) {
          array = array.filter(function (row) {
            return Object.keys(row).filter(function (column) {
              return filterableColumns.includes(column);
            }).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(textFilter.filterText.toLowerCase()) >= 0;
            });
          });
        }

        domainFilters.filter(function (filter) {
          return filter.isValid();
        }).forEach(function (filter) {
          array = array.filter(function (row) {
            return filter.filterBy.includes(row[filter.filterColumn]);
          });
        });

        if (sortBy) {
          array = array.slice().sort(function (a, b) {
            a = a[sortBy];
            b = b[sortBy];
            return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
          });
        }

        var rowId = 0;
        array = array.map(function (row) {
          row._id = rowId++;
          return row;
        });
        return array;
      }
    }, {
      key: "pluck",
      value: function pluck(array, key) {
        return array.reduce(function (p, v) {
          return p.concat(v[key]);
        }, []);
      }
    }]);

    return FilterEngine;
  }();

  var filterEngine = new FilterEngine();

  //
  var script$2 = {
    name: 'tu-table',
    components: {
      BaseRow: BaseRow,
      BaseColumnHeader: BaseColumnHeader
    },
    props: {
      /**
       * Data that will be used to render the table
       * @type {String}
       */
      data: {
        required: true,
        type: Array
      },

      /**
       * Defines if caption will be displayed
       * @type {Boolean}
       * @default true
       */
      showCaption: {
        required: false,
        type: Boolean,
        default: true
      },

      /**
       * Classes of table element.
       * @type {String}
       */
      tableClass: {
        required: false,
        type: String
      },

      /**
       * Classes of tbody (table) element.
       * @type {String}
       */
      tableBodyClass: {
        required: false,
        type: String
      },

      /**
       * Term used to filter the table. Applies only to columns with the
       * filterable property enabled.
       * @type {String}
       *
       */
      filterText: {
        required: false,
        type: String,
        default: ''
      },

      /**
       * Minimal length of the filter search field to filter the table
       * @type {Number}
       *
       */
      filterMinSize: {
        required: false,
        type: Number,
        default: 2
      },

      /**
       * Order the table by a column
       * @type {String}
       */
      defaultSortBy: {
        required: false,
        type: String
      },

      /**
       * Order the table by a column
       * @type {String}
       */
      defaultSortOrder: {
        required: false,
        default: 'asc',
        validator: function validator(value) {
          return ['asc', 'desc'].includes(value);
        }
      },

      /**
       * Order the table by a column
       * @type {String}
       */
      noDataText: {
        required: false,
        type: String,
        default: 'No results found.'
      }
    },
    data: function data() {
      return {
        columns: [],
        domainFilters: [],
        orderBy: null,
        orderAscDesc: 1
      };
    },
    computed: {
      filteredAndSortedData: function filteredAndSortedData() {
        var data = this.data;
        var orderBy = this.orderBy;
        var order = this.orderAscDesc;
        var textFilter = new TextFilter(this.filterText, this.filterMinSize);
        var domainFilters = this.domainFilters;
        return filterEngine.filterArray(data, orderBy, order, this.columns, textFilter, domainFilters);
      }
    },
    mounted: function mounted() {
      this.columns = this.mapVueComponentsToObjects('TuebleColumn', 'Column');
      this.domainFilters = this.mapVueComponentsToObjects('FilterByDomain', 'DomainFilter');

      if (this.defaultSortBy) {
        this.orderBy = this.defaultSortBy;
        this.setDefaultColumn(this.defaultSortBy);
      }

      this.$on('FilterByDomainChanged', function (msg) {
        this.domainFilters = this.mapVueComponentsToObjects('FilterByDomain', 'DomainFilter');
      });
    },
    methods: {
      updateSortColumn: function updateSortColumn(columnIndex) {
        for (var i = 0; i < this.columns.length; i++) {
          if (i == columnIndex) {
            if (this.columns[i].isActive) this.columns[i].sortOrder = this.columns[i].sortOrder * -1;
            this.columns[i].isActive = true;
            this.orderBy = this.columns[i].show;
            this.orderAscDesc = this.columns[i].sortOrder;
          } else {
            this.columns[i].isActive = false;
          }
        }
      },
      setDefaultColumn: function setDefaultColumn(columnName) {
        var _this = this;

        this.columns.forEach(function (element) {
          if (element.show == columnName) {
            element.isActive = true;

            if (_this.defaultSortOrder == 'asc') {
              element.sortOrder = 1;
            }

            if (_this.defaultSortOrder == 'desc') {
              element.sortOrder = -1;
            }

            _this.orderAscDesc = element.sortOrder;
          }
        });
      },
      mapVueComponentsToObjects: function mapVueComponentsToObjects(vueName, className) {
        var classesMapping = {
          Column: Column,
          DomainFilter: DomainFilter
        };
        var vueComponents = this.$children.filter(function (el) {
          return el.$options.name == vueName;
        });
        return vueComponents.map(function (component) {
          return new classesMapping[className](component);
        });
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tueble-component"},[_c('table',{class:_vm.tableClass},[(_vm.showCaption)?_c('caption'):_vm._e(),_vm._v(" "),(_vm.filteredAndSortedData.length == 0)?_c('p',{staticClass:"no-results"},[_vm._v(_vm._s(_vm.noDataText))]):_vm._e(),_vm._v(" "),_c('thead',[_c('tr',_vm._l((_vm.columns),function(column,index){return _c('BaseColumnHeader',{key:column.id,attrs:{"column":column,"column-index":index},on:{"sortUpdate":_vm.updateSortColumn}})}))]),_vm._v(" "),_c('tbody',{class:_vm.tableBodyClass},_vm._l((_vm.filteredAndSortedData),function(row,index){return _c('BaseRow',{key:row._id,attrs:{"columns":_vm.columns,"row-index":index,"row-data":row,"filter-text":_vm.filterText}})}))]),_vm._v(" "),_c('div',{staticStyle:{"display":"none"}},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tueble = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  var script$3 = {
    name: 'TuebleColumn',
    props: {
      /**
       * Sets which object's property to display
       * @type {String}
       */
      show: {
        type: String,
        required: false
      },

      /**
       * Sets the column as sortable
       * @type {Boolean}
       * @default true
       */
      sortable: {
        type: Boolean,
        default: true
      },

      /**
       * If true, the search text will be compared to the column contents
       * @type {Boolean}
       * @default true
       */
      filterable: {
        type: Boolean,
        default: true
      },

      /**
       * If true will display the row number
       * @type {Boolean}
       * @default false
       * @required: false
       */
      index: {
        type: Boolean,
        default: false,
        required: false
      },

      /**
       * If true finds specified terms in your input text and adds HTML tag around them
       * @type {Boolean}
       * @default false
       * @required: false
       */
      highlight: {
        type: Boolean,
        default: false,
        required: false
      },

      /**
       * Sets the text of the column header
       * @type {String}
       * @required true
       */
      label: {
        type: String,
        required: true
      },

      /**
       * Classes that will be added to column
       * @type {String}
       */
      columnClass: {
        type: String,
        default: ''
      },

      /**
       * Classes that will be added to column header
       * @type {String}
       */
      columnHeaderClass: {
        type: String,
        default: ''
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._e()};
  var __vue_staticRenderFns__$3 = [];

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TuebleColumn = normalizeComponent_1(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  //
  //
  //
  //
  var script$4 = {
    name: 'FilterByDomain',
    props: {
      /**
       * Set of elements to be checked in the column provided
       * @required true
       * @type {Array}
       */
      filterBy: {
        required: true,
        type: Array,
        default: ''
      },

      /**
       * Name of the column to be searched for
       * @required true
       * @type {String}
       */
      filterColumn: {
        required: true,
        type: String
      }
    },
    watch: {
      filterBy: function filterBy() {
        this.$parent.$emit('FilterByDomainChanged', this.filterBy);
      }
    }
  };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._e()};
  var __vue_staticRenderFns__$4 = [];

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var FilterByDomain = normalizeComponent_1(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      undefined,
      undefined
    );



  var components = /*#__PURE__*/Object.freeze({
    Tueble: Tueble,
    TuebleColumn: TuebleColumn,
    FilterByDomain: FilterByDomain
  });

  function highlightText(words, query) {
    if (!query) {
      return words;
    } // var iQuery = new RegExp(query, "ig");


    return words.toString().replace(new RegExp(query, "gi"), function (match) {
      return '<span class="highlight">' + match + '</span>';
    });
  }

  // Import vue components

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Object.keys(components).forEach(function (componentName) {
      var compName = components[componentName].name ? components[componentName].name : componentName;
      Vue.component(compName, components[componentName]);
    });
    Vue.filter('highlight', highlightText);
  } // Create module definition for Vue.use()


  var plugin = {
    install: install
  }; // To auto-install when vue is found

  /* global window global */

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  } // Default export is library as a whole, registered via Vue.use()

  exports.FilterByDomain = FilterByDomain;
  exports.HighlightText = highlightText;
  exports.Tueble = Tueble;
  exports.TuebleColumn = TuebleColumn;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
