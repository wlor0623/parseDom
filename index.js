const domParse = (function () {
  function domParse(elements) {
    this.elements = elements;
  }

  // 获取属性
  domParse.prototype.attr = function (name) {
    if (this.elements.length > 0) {
      if (name === 'src') {
        return this.elements[0].getAttribute('temp-src');  // 获取temp-src而非src
      }
      return this.elements[0].getAttribute(name);
    }
    return null;
  };

  // 获取文本内容
  domParse.prototype.text = function () {
    let text = '';
    this.elements.forEach(element => {
      text += element.textContent;
    });
    return text;
  };

  // 获取表单元素的值
  domParse.prototype.val = function () {
    if (this.elements.length > 0) {
      return this.elements[0].value;
    }
    return null;
  };

  // 添加 eq 方法
  domParse.prototype.eq = function (i) {
    if (i < 0) {
      i = this.elements.length + i;
    }
    if (i >= 0 && i < this.elements.length) {
      return new domParse([this.elements[i]]);
    }
    return new domParse([]);
  };

  domParse.prototype.find = function (selector) {
    let foundElements = [];
    this.elements.forEach(element => {
      const elements = element.querySelectorAll(selector);
      foundElements = foundElements.concat(Array.from(elements));
    });
    return new domParse(foundElements);
  };

  domParse.prototype.children = function (selector) {
    let childrenElements = [];
    this.elements.forEach(element => {
      const children = Array.from(element.children);
      if (selector) {
        const filteredChildren = children.filter(child => child.matches(selector));
        childrenElements = childrenElements.concat(filteredChildren);
      } else {
        childrenElements = childrenElements.concat(children);
      }
    });
    return new domParse(childrenElements);
  };

  domParse.prototype.parent = function () {
    const parentElements = [];
    this.elements.forEach(element => {
      const parent = element.parentNode;
      if (parent && !parentElements.includes(parent)) {
        parentElements.push(parent);
      }
    });
    return new domParse(parentElements);
  };

  domParse.prototype.hasClass = function (className) {
    return this.elements.some(element => element.classList.contains(className));
  };

  // 添加 each 方法
  /**
   * 遍历 domParse 实例中的所有元素，并为每个元素执行回调函数
   * @param {Function} callback - 回调函数，接收当前元素和索引作为参数
   * @returns {domParse} 返回当前 domParse 实例，以便链式调用
   */
  domParse.prototype.each = function (callback) {
    this.elements.forEach((element, index) => {
      callback.call(element, index, element);
    });
    return this;
  };

  function load(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // 替换所有的src属性为temp-src
    const imgTags = tempDiv.querySelectorAll('[src]');
    imgTags.forEach(img => {
      const src = img.getAttribute('src');
      img.setAttribute('temp-src', src);  // 设置temp-src
      img.removeAttribute('src');  // 移除src属性
    });

    const find = function (selector) {
      const elements = tempDiv.querySelectorAll(selector);
      return new domParse(Array.from(elements));
    };
    return find;
  }

  return {
    load: load
  };
})();
