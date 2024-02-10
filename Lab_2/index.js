const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
  let filedata = ""
  let stylesdata = ""
  if (req.url == "/") {
      res.setHeader("content-type", "text/html")
      const todosFile = fs.createReadStream("./TodoList.json", 'utf-8');
      const homeStyles = fs.createReadStream("./styles.css", 'utf-8')
      todosFile.pause();
      homeStyles.on('data' , (chunk) => {
        stylesdata += chunk
      })
      homeStyles.on('end' , () => {
        res.write(`<head><link rel="stylesheet" href="./styles.css"></head>`)
        todosFile.resume()
      })
      todosFile.on('data' ,(chunk) => {
        filedata += chunk;
      })
      todosFile.on('end', () => {
        const jsonData = JSON.parse(filedata);
        jsonData.forEach((todo) => {
          res.write(`<p class='${todo.status}'>${todo.title}</p>`)
        })
        res.end();
      })
    }
    else if(req.url == "/astronomy") {
      const astronomyImage = fs.createReadStream('./images/fossils.jpg', 'base64')
      res.setHeader("content-type", 'text/html')
      let imgData = ""
      astronomyImage.on('data', (chunk) => {
        imgData += chunk;
      })
      astronomyImage.on('end', () => {
        const imgSrc = `data:image/jpeg;base64,${imgData}`
        res.write(`<img src="./images/fossils.jpg">`)
        res.end()
      })
    }
    else {
      res.write('<h1>404 PAGE NOT FOUND</h1>')
      res.end()
    }

}).listen(3000, () => {
  console.log("Server is listening on 9000....")
})
