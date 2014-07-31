libs <- c("shiny", "knitr", "R.utils", "markdown", "igraph", "ENA", "shinyBS")

# function to render .Rmd files to html on-the-fly
includeRmd <- function(path){
  # shiny:::dependsOnFile(path)
  contents <- paste(readLines(path, warn = FALSE), collapse = '\n')
  # do not embed image or add css
  html <- knit2html(text = contents, fragment.only = TRUE, options = "", stylesheet = "www/empty.css")
  Encoding(html) <- 'UTF-8'
  HTML(html)
}
