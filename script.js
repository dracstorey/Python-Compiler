
arr = []
pseudo_code_words = ["assignment","turtle","forward","right","left"]
key_words=["if ", "for ", "def ", "while ", "else"]
variables = []
turtle_angle = 0
turtle_x = 0
turtle_y = 0

graphics_points = []


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
  // Set variables 
  arr = []
  output = ""
  //variables = []
  turtle_angle = 0
  turtle_x = 0
  turtle_y = 0   
  graphics_points = []
  // Reset output window
  document.getElementById('results').innerHTML = ""
  //get code from text area
  code = document.getElementById('code').value
  // parse the code
  msg = parse(code);
  // If msg is an array then add the additional statements and reduce to string otherwsie it's an error and just display it
  if (Array.isArray(msg))
  {
    msg = insert_array(msg, end_insert)
    msg = msg.reduce(function(result, element){return result + '\n' + element});
  };
  document.getElementById('results').innerHTML = msg;
}

// Search for keywords in the python code
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

function compile()
{
  // Get psuedo code from window
  exec_code = document.getElementById('results').value
  // slit into an array for each line
  code_array =  exec_code.split("\n")
  for (j = 0; j < code_array.length; j++){
  // run each line of code and action the results
  if (code_array[j].trim() == ""){}
  else
  {
    final_res = do_action(code_array[j])
  }
  // if true comes back go onto next line otherwise report error on that line
  //if (completed)
  // {}else{document.getElementById('results').innerHTMl = "error line " + j+1}
  }
  alert (graphics_points)
}

// check whetehr a variable is in the variable list
function variable_exists(v){
  var count = 0;
  while (count < variables.length){
    if (variables[count].label == v){
      return count
    }
    count ++
  }
  return -1
}

// Check the key word and action the statement
function run_word(res_arr)
{

  // Deal with turtle
  if (res_arr[0] == "turtle")
    {};

  //deal with assignment
  if (res_arr[0] == "assignment") 
  {// add variable to global varaible array and assigment value and type
    x = variable_exists(res_arr[1])
    if (x == -1){
      variables[variables.length] = {label:res_arr[1], value:res_arr[2]}
    }
    else
    {variables[count].value = res_arr[2]}
  };

  // Deal with forward command
  if (res_arr[0] == "forward") 
  {// add variable to global varaible array and assigment value and type
    turtle_x = turtle_x + Math.round(res_arr[1]*Math.sin(turtle_angle*Math.PI/180));
    turtle_y = turtle_y + Math.round(res_arr[1]*Math.cos(turtle_angle*Math.PI/180));
    graphics_points.push([turtle_x,turtle_y])
  }


  // deal with right command
  if (res_arr[0] == "right") 
  {// add variable to global varaible array and assigment value and type
    turtle_angle = (turtle_angle + parseInt(res_arr[1]))%360
  }
  
  // deal with left command
  if (res_arr[0] == "left") 
  {// add variable to global varaible array and assigment value and type
    turtle_angle = (turtle_angle - parseInt(res_arr[1]))%360
  }
}

// Imparts correct action on a key word from the program
function  do_action(my_res)
{
  check = mymodule.parse(code_array[j])
  s = check[0].split("~")
  // for assignmnet replace variables after equal sign with 
  if (s[0] == "assignment")
  {
    //find the equal sign
    r = code_array[j].search("=")
    //replace any variables after = sign with their values and recompose the string
    str = code_array[j].substring(0,r) + replace_variables(code_array[j].substring(r, code_array[j].length))
    //re-parse the line
    // check = mymodule.parse(str)
    //  s = check[0].split("~")
  }
  else
  {
    str = replace_variables(code_array[j])
  }
  // parse the correct line of code
  check = mymodule.parse(str)
  // split the result ready for action on the key word
  s = check[0].split("~")
  // check key word exists and do the action
  if (pseudo_code_words.includes(s[0]))
  {
    run_word(s)
    return true
  }
  else
  {
    return false
  }
}


// replaces any variables in a string with the values of those variables form the variable list.
function replace_variables(c){
  var temp = ""
  var count = 0
 // alert (c.length)
  while (count < c.length) 
  {
    
    if (c[count].search(/[a-zA-Z0-9]/) > -1)
    {
      temp = temp + c[count]
    }
    else
    {
      place = variable_exists(temp)
      if(place >-1)
      {
        c = c.substring(0,count-temp.length) + variables[place].value + c.substring(count,c.length)
        count = count - temp.length
      }
      temp = ""
    }
    count = count + 1
  };
  // check if the final temp string is a varibale and replace 
  place = variable_exists(temp)
    if(place >-1)
    {
      c = c.substring(0,count-temp.length) + variables[place].value + c.substring(count,c.length)
      count = count - temp.length
    }
    temp = "" 
 return c
}

// Used to test indiivual Javascript statements
function tester()
{    // Get the code string from index.html
c = "/ello"
alert(c[1])
alert(c[1].search(/[a-zA-Z0-9]/))
}
