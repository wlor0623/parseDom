const domParse = (function () {
  function domParse(elements) {
    this.elements = elements;
  }

  // 获取属性
  domParse.prototype.attr = function (name) {
    if (this.elements.length > 0) {
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
  function load(html) {
    // 创建一个 <noscript> 元素
    const tempNoScript = document.createElement('noscript');
    // 设置 <noscript> 的内容为 HTML 字符串
    tempNoScript.innerHTML = html;

    // 注意：<noscript> 元素在 DOM 中的内容不会被解析为真正的 DOM 元素，
    // 所以我们需要将内容提取出来进行后续处理。
    // 这里可以新建一个容器，将 <noscript> 内的 HTML 提取出来。
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tempNoScript.innerHTML;

    // 返回一个包装好的函数，用于查询 DOM 节点
    const find = function (selector) {
      const elements = tempDiv.querySelectorAll(selector);
      return new parsedom(Array.from(elements));
    };
    return find;
  }


  return {
    load: load
  };
})();
