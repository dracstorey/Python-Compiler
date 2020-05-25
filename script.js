
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

// Get the indent by whitespace count for the line
function indent_count(s){
  space_count = s.search(/\S/)
  return space_count
}

// check the indent against the indent stack for errors
function indent_check(indent, indent_req){
  // set indent error to empty
  indent_error = 0;
  // if further indent has happened
  if (indent > indent_stack[indent_stack.length-1]){
    // check whether indent was required
    if (indent_req)
    {
    indent_stack.push(indent)
    indent_num ++}
    else
    {
      return -1
    };
  }
  else
  {
    // if dedent occurred
    if (indent < indent_stack[indent_stack.length-1])
      if (indent_req)
      {
        return -1
      }
      else
      {
        if (indent_stack.includes(indent))
        {
          while (indent_stack.length > 1 && indent_stack[indent_stack.length-1] > indent)
          {
            indent_stack.pop()
            indent_num = indent_num - 1
          }
        }
        else
        {
          indent_error = i; return indent_error
        }
      };
    // if indent is equal to previous 
    if (indent == indent_stack[indent_stack.length-1])
    {
      if (indent_req)
      {
        return -1
      };
    };
  }
  return indent_error;
}

function parse(){
  // Set variables
  // Indent stack
  indent_stack = [0]
  // Reason for indent stack
  indent_comm_stack = []
  // indent counter
  indent_num = 0
  // next line requires an indent flag
  indent_exp = false
 
  // Split code into lines
  var arr = code.split("\n")
  
  // loop around each line to strip comments, check for indents
  for (i = 0; i < arr.length; i++)
  {
    // check there is smehting on the line if not ignore it
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
        n = indent_check(indent, indent_exp)
        if (n > 0) {return "Indent error on line " + n }
        if (n == -1) {return "Indent error on line " + (i+1) }
        // check if next line requires an indent
        indent_exp = keyword_search(arr[i])
        }
    }

  }
  return "indent num is " + indent_num
} 
// end of parse

// Run the parser and output the results
function main(){
    // Get the code string from index.html
  document.getElementById("results").innerHTML = ""
  code = document.getElementById('code').value
  // parse the code
  msg = parse(code);

  // output result message
  document.getElementById("results").innerHTML = msg 
}

function keyword_search(s)
{
  // Search for keywords at the beginning of a line which require an indent after them
  key_words=["if ", "for ", "def ", "while "]
  for (j = 0; j < key_words.length; j++){
    n =  0;
    p = 0;
    n = s.search(/\S/);
    p = s.substring(n,n+key_words[j].length).search(key_words[j]);
    if (p == 0){return true};
  };
  return false
}



// Used to test indiivual Javascript statements
function tester()
{    // Get the code string from index.html
  document.getElementById("results").innerHTML = ""
  code = document.getElementById('code').value
  
 // n = code.search(/\S/)
  // s = code.substring(n,n+3).search("if ")
  b = keyword_search(code)

  // output result message
  document.getElementById("results").innerHTML = b
}