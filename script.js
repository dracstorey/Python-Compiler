
// Function to strip comments out 
function strp_comm(s)
{
  idx = s.indexOf("#")
  if (idx > -1)
  {
    s = s.substring(0,idx)
  }
  return s
}

// Get the indent Hwitespace count for the line
function indent_count(s){
  space_count = s.search(/\S/)
  return space_count
}

// check the indent against the indent stack for errors
function indent_check(indent){
  indent_error = 0
  if (indent > indent_stack[indent_stack.length-1]){
    indent_stack.push(indent)
    indent_num ++}
  else{if (indent < indent_stack[indent_stack.length-1]){
    if (indent_stack.includes(indent)){
      while (indent_stack.length > 1 && indent_stack[indent_stack.length-1] > indent){
        indent_stack.pop()
        indent_num = indent_num - 1}}
    else{indent_error = i; return indent_error}}}
  return indent_error
  }

function parse(){
  // Set variables
  indent_stack = [0]
  indent_comm_stack = []
  indent_num = 0
  // Get the code string
  document.getElementById("results").innerHTML = ""
  code = document.getElementById('code').value
  // Split code into lines
  var arr = code.split("\n")
  // loop around each line to strip comments, check for indents
for (i = 0; i < arr.length; i++)
{
  if (arr[i].trim() == "")
  {
  }
  else
  {
    // Strip comments
    arr[i] = strp_comm(arr[i])
    // get  indent 
    indent = indent_count(arr[i])
    // check indent level (ignore -1 as that is comment related)
    if (indent > -1){
      n = indent_check(indent)
      if (n > 0) {return "Indent error on line " + n }
      }
  }
}
return "indent num is " + indent_num
} // end of parse

function main(){
  msg = parse();
  document.getElementById("results").innerHTML = msg 
}