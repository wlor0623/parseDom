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
