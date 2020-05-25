
key_words=["if ", "for ", "def ", "while ", "else"]
arr = []
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
      // add indent on to stack and 
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
           // alert(indent_stack + ":" + indent_comm_stack + ":" + end_insert)
            indent_stack.pop()
            // put in end statements - if line is else and top is if ignore
            var d = indent_comm_stack[indent_comm_stack.length-1].split("~")
            //alert(d[1])
            if (arr[i].trim() == "else:" && d[1].trim() == "if")
            {}
            else
            {
              indent_comm_stack.pop()
              end_insert.push(i + "~" + "END " + d[1])
            }
 
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

function update_line(s,v)
{
  if (v.trim() == "if"){if (s.search(":") > 0){s = s.replace(":"," THEN");s = s.replace("if"," IF");return s }
      else {return "error missing :"}} 
  if (v.trim() == "else"){if (s.search(":") > 0){return "ELSE"}
      else {return "error missing :"}} 
  return s;  
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
  //Stores values form indent parsing
  indent_vals = []
  // final staements inserted
  end_insert= []
 
  // Split code into lines
  arr = code.split("\n")
  
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
      if (indent > -1)
      {
        n = indent_check(indent, indent_exp)
        if (n > 0) {return "Indent error on line " + n }
        if (n == -1) {return "Indent error on line " + (i+1) }
        // check if next line requires an indent
        indent_vals = keyword_search(arr[i])
        indent_exp = indent_vals[0]

        // update line if a key word is present and check where end is
        if (indent_vals[1] == "") 
        {
        }
        else
        {
          // update syntax of the line to include pseudo syntax
          arr[i] = update_line(arr[i],indent_vals[1]);
          // add to indent stack to find enf of statement
          if (indent_vals[1] == "else")
          {
          }
          else
          {
          indent_comm_stack.push(indent + "~" + indent_vals[1]);
         // alert(arr[i] + ":" + indent_comm_stack)
          }
        };

      }
    }
   // alert(end_insert)
   // alert(indent_comm_stack)
  }
  // clear the indent stack of un-finished statement
  while (indent_comm_stack. length > 0)
  {var d = indent_comm_stack.pop().split("~");
   end_insert.push(i + "~" + "END " + d[1])}
  return arr
}
// end of parse

function insert_array(arr,insert)
{
  num = 0
  for (i = 0; i < insert.length; i++)
  {
    var d = insert[i].split("~")
    arr.splice(parseInt(d[0])+num, 0, d[1]);
    num = num + 1
  }
  return arr
}

// Run the parser and output the results
function main(){
    // Get the code string from index.html
  document.getElementById("results").innerHTML = ""
  code = document.getElementById('code').value
  // parse the code
  msg = parse(code);
  msg = insert_array(msg, end_insert)
  msg = msg.reduce(function(result, element){return result + '\n' + element});
  // output result message
  document.getElementById("results").innerHTML = msg}

function keyword_search(s)
{
  // Search for keywords at the beginning of a line which require an indent after them
  key=[]

  for (j = 0; j < key_words.length; j++){
    n =  0;
    p = 0;
    n = s.search(/\S/);
    p = s.substring(n,n+key_words[j].length).search(key_words[j]);
    if (p == 0){key[0] = true; key[1]=key_words[j]; return key};
  };
  key[0] = false; 
  key[1]=""; 
  return key
}



// Used to test indiivual Javascript statements
function tester()
{    // Get the code string from index.html
  key_word=[]
  document.getElementById("results").innerHTML = ""
  code = document.getElementById('code').value
  
 // n = code.search(/\S/)
  // s = code.substring(n,n+3).search("if ")
  key_word = keyword_search(code)

  // output result message
  document.getElementById("results").innerHTML = key_word[0] + ":" + key_word[1]
}