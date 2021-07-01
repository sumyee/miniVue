class Observe {
	constructor(value) {
		this.walk(value);
	}

  // 对象
	walk(obj) {
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			defineReactive(obj, keys[i], obj[keys[i]]);
		}
	}
}

// 数据响应式（核心）
export function defineReactive(obj, key, val) {

  // 递归，使对象值也进行响应式
  observe(val)
  // 数据劫持
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log(`🚀 ~ 访问值 ${key}`, val);
			return val;
		},
		set(value) {
			val = value;
			console.log(`🚀 ~ 设置值 ${key}`, value);
		},
	});
}

export function observe(value) {
	if ((value !== null && typeof value === 'object') || Array.isArray(value)) {
		return new Observe(value);
	}
}
