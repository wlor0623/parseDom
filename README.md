# parseDom
类似于cheerio的api 方便浏览器和油猴脚本使用

## 使用方法
```
<script>
    const $ = domParse.load(`<p id="koko"><img src="tieba" /> <o>123</o><span data-src="baidu">你好</span> <span >helo</span><p>`);

    // 获取属性
    const id = $('p').find('span').parent().attr('id');
    console.log(id);

  </script>
```

## API 文档  

### `load(html)`  

**功能**：解析HTML字符串，并返回一个解析对象。  

**示例**：
```js
const $ = parsedom.load('<div class="box">Hello</div>');
console.log($('div').text()); // 输出: "Hello"
```

---

### `attr(name)`  

**功能**：获取元素的属性值（仅返回第一个匹配元素的属性值）。  

**示例**：
```js
console.log($('a').attr('href')); // 获取第一个 <a> 标签的 href
```

---

### `text()`  

**功能**：获取所有匹配元素的文本内容，并拼接返回。  

**示例**：
```js
console.log($('p').text()); // 获取所有<p>标签的文本
```

---

### `val()`  

**功能**：获取表单元素的值，仅适用于`<input>`、`<textarea>`等可输入元素。  

**示例**：
```js
console.log($('#username').val()); // 获取用户名输入框的值
```

---

### `eq(index)`  

**功能**：获取指定索引的元素，并返回一个新的`domParse`实例。  

**示例**：
```js
console.log($('li').eq(2).text()); // 获取第三个 <li> 标签的文本
```

---

### `find(selector)`  

**功能**：在当前匹配的元素中查找符合选择器的子元素。  

**示例**：
```js
console.log($('.container').find('p').text()); // 查找.container中的所有<p>并获取文本
```

---

### `children(selector?)`  

**功能**：获取所有子元素，可选参数`selector`过滤子元素。  

**示例**：
```js
console.log($('ul').children('li').text()); // 获取所有<ul>下的<li>的文本
```

---

### `parent()`  

**功能**：获取匹配元素的父级元素，去重后返回。  

**示例**：
```js
console.log($('.child').parent().attr('class')); // 获取.child的父级元素的class
```

---

### `hasClass(className)`  

**功能**：判断匹配的元素是否包含某个类名。  

**示例**：
```js
console.log($('#box').hasClass('active')); // 判断 #box 是否包含 active 类
```
