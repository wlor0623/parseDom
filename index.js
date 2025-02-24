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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
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
