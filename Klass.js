
var Klass = function () {
  var _mixin = function (b, e) {
		for (var k in e) {
			e.hasOwnProperty(k) && (b[k] = e[k])
		}
	};
	// 模拟extend继承方式
	var _extend = function () {
		// 开关,为了在继承的时候不调用父类的init方法渲染，而把调用放在子类
		this.TODOinit = false;
		// 原型赋值
		var proto = new this;
		this.TODOinit = true;

		var args = [].slice.call(arguments);
		var len = args.length;

		// for循环是为了实现多个继承,Base.extend(events,TODOcommon)
		for (var i = 0; i < len; i++) {
			_mixin(proto, args[i].prototype || args[i])
		}

		// 继承后返回的子类
		var SubKlass = function () {
			var isNew = this instanceof SubKlass, isInit;
			if (!isNew) {
			  // 这里有个小问题, 实例化参数的处理
				return new arguments.callee(arguments[0])
			} else {
				isInit = (SubKlass.TODOinit && this.init)
				if (isInit) {
				  //调用
					this.init.apply(this, arguments)
					return this
				}
			}
		};
		// 继承静态方法
		_mixin(SubKlass, this);
		// 把混入之后的属性和方法赋值给子类完成继承
		SubKlass.prototype = proto;
		SubKlass.prototype.constructor = SubKlass;
		// 给子类页也添加继承方法,子类也可以继续继承
		SubKlass.extend = arguments.callee;
		return SubKlass
	};
	var Klass = function () { };
	Klass.extend = _extend;
	return Klass
} ();
