
arr = []
pseudo_code_words = ["assignment","turtle","forward","right","left","if", "while", "print", "input", "function","func_call"]
key_words=["if ", "for ", "def ", "while ", "else"]
variables = []
turtle_angle = 0
turtle_x = 0
turtle_y = 0
graphics_points = []
print_list=[]
input_values = [14]
input_pointer = 0
function_list = []
graphics_answers = []
graphics_answers.push([0,0])
graphics_answers.push([0,100])
graphics_answers.push([100,100])
graphics_answers.push([100,0])
graphics_answers.push([0,0])

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
              var temp = d[1]
              if (temp.trim() == "def")(temp = "function");
              end_insert.push(i + "~" + "END " + temp.toUpperCase())
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
  if (v.trim() == "while"){if (s.search(":") > 0){s = s.replace(":","");s = s.replace("while","WHILE");return s}else {return "error missing :"}}
  if (v.trim() == "def"){if (s.search(":") > 0){s = s.replace(":","");s = s.replace("def","FUNCTION");return s}else {return "error missing :"}}    
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
  var temp = d[1]
  if (temp.trim() == "def")(temp = "function");
   end_insert.push(i + "~" + "END " + temp.toUpperCase())}
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

//
function go()
{
  input_pointer = 0;
  python_code = document.getElementById('code').value
  // run the program for each of the inputs
  for (inp_count = 0; inp_count < input_values.length; inp_count++)
    {run_prog(python_code)};
}

// check graphics points
function check_graphics(a,b)
{
  graph_correct = "correct"
    if (a.length == b.length)
    {
      z = 0
      while (z < a.length && graph_correct == "correct")
      {
       val1 = (a[z][0] == b[z][0])
       val2 = (a[z][1] == b[z][1])
        if(val1 && val2)
        {}
        else 
        {graph_correct = "not correct: answer should be: " + graphics_answers}
        z++;
      }
    }
    else
    {
      graph_correct  = "incorrect - you have not visited enough points"
    }
    return graph_correct
}

// Run the parser and output the results
function run_prog(p){
  // Set variables 
  arr = []
  output = ""
  variables = []
  turtle_angle = 0
  turtle_x = 0
  turtle_y = 0   
  graphics_points = [];graphics_points.push([0,0])
  print_list = []

 
  //get code from text area
  code = p
  // parse the code
  try {
    msg = parse(code);
    // If msg is an array then add the additional statements and reduce to string otherwsie it's an error and just display it
    if (Array.isArray(msg))
    {
      msg = insert_array(msg, end_insert)
      msg = msg.reduce(function(result, element){return result + '\n' + element});
      document.getElementById('results').innerHTML = msg;
      compile(msg);
      //check graphics_points against graphics_answers
      graph_correct = check_graphics(graphics_points,graphics_answers)

      document.getElementById('graphics').innerHTML = "Graphics points; " + graphics_points + "<br>" + graph_correct;
      document.getElementById('printer').innerHTML = "Printer output: " + print_list;
    }
    else
    {
    // alert (msg);  
    document.getElementById('results').innerHTML = msg;
    }
  }
  catch(err) {
    alert ("See pseudo code for error on line " + j_count+1);
  }

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

function function_sweep()
{
  i_count = 0;
  f_true = false;
  while (i_count < code_array.length)
  {
    if (code_array[i_count].substring(0,8) == "FUNCTION" && f_true == false)
    {
      f_start = i_count;
      f_true;
      f_def = code_array[i_count]
    }
    else
    {
      if (f_true == true)
        {alert ("function definitions overlap")}
      else
      {
        if(code_array[i_count].substring(0,13) == "END FUNCTION")
        {
          check = mymodule.parse(f_def)
          s = check[0].split("~")
          x = function_exists(s[1])
          f_end = i_count
          if (x == -1)
           {
             var var_array= s[2].split(",")
             var p_list = []
             for (y = 0; y < var_array.length; y++)
             {
               if (var_array[y].trim() == ""){}else{p_list[p_list.length] = (var_array[y].trim())}
             }
             function_list[function_list.length] = {label:s[1], param:p_list, start:f_start, end:f_end}
           } 
          f_true = false
        }
      }
    }
      i_count ++
  }
}

function compile(m)
{
  // Get psuedo code from window
  exec_code = document.getElementById('results').value

  //exec_code = m
  // slit into an array for each line
  code_array =  exec_code.split("\n")
  
  j_count = 0
  function_sweep ()
  j_count = 0
  while (j_count < code_array.length)
  {
    // run each line of code and action the results
    if (code_array[j_count].trim() == ""){}
    else
    {
      //alert ("main: " + j_count + ":" + code_array[j_count])
      final_res = do_action(code_array[j_count])
    }
    j_count ++
    // if true comes back go onto next line otherwise report error on that line
    //if (completed)
    // {}else{document.getElementById('results').innerHTMl = "error line " + j+1}
  }

}
// check whetehr a function is in the function list
function function_exists(v){
  var count = 0;
  while (count < function_list.length){
    if (function_list[count].label == v){
      return count
    }
    count ++
  }
  return -1
}


// check whether a variable is in the variable list
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
    {variables[x].value = res_arr[2]}
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

  // deal with the IF statement
  if (res_arr[0] == "if")
  {
    var my_if = find_if_points().split("~")
   // alert(my_if)
    if (res_arr[1] == "true")
    {
      for (n = my_if[0]; n < my_if[1] -1 ; n++)
      {
      j_count = n
      //alert ("IF" + j_count + ":" + code_array[j_count].trim())
      do_action (code_array[j_count].trim())
      }
    }
    else
    {
      for (n = my_if[1]; n < my_if[2] ; n++)
      {j_count = n;
      //alert ("ELSE" + j_count + ":" + code_array[j_count].trim())
      do_action(code_array[n].trim())}
    }
    //j_count = end_pt
    j_count = my_if[2] 
    //alert(j_count)
  };

  // deal with WHILE loop
  if (res_arr[0] == "while")
  {
    if (res_arr[1] == "true")
    {
      var my_while = find_while_points().split("~")
      //alert(my_while)
      j_count  = my_while[0];
      while (j_count < my_while[1])
      {
        //alert ("while " + j_count + ":" + code_array[j_count].trim())
        do_action (code_array[j_count].trim())
        j_count ++
      }
      j_count = my_while[0] - 2
    }
    else
    {
      var my_while = find_while_points().split("~")
      j_count = my_while[1]
    }
  };

  // deal with print
  if (res_arr[0] == "print")
  {
    print_list.push(res_arr[1])
  };

  // Skip functions when running the code 
  if (res_arr[0] == "function")
  {
    j_count = function_list[function_exists(res_arr[1])].end
  }

   // When  function is called execute it then return
  if (res_arr[0] == "func_call")
  {
    curr_line = j_count
    run_function(res_arr[1],res_arr[2])
    j_count = curr_line
    alert(j_count)
  }

};

// runs a function call 
function run_function (f,u){
  var a_list = []
  a = u.split(",")
  for (y = 0; y < a.length; y++)
    {
      if (a[y].trim() == ""){}else{a_list[a_list.length] = a[y].trim()}
    }
  func_var_list = function_list[function_exists(f.trim())].param
  if (a_list.length != func_var_list.length)
    {alert ("different parameter lists")}
  load_variables(func_var_list, a_list)
  j_count = function_list[function_exists(f.trim())].start + 1
  while (j_count < function_list[function_exists(f)].end-1)
  {
    do_action (code_array[j_count].trim());
    j_count ++;
  }
};

function load_variables(d,c)
{
  for (k = 0; k < d.length; k++)
  {
    variables[variables.length] = {label:d[k], value:c[k]}
  }
}

function find_while_points()
{
j_count ++;
start_pt = j_count;
code_line = code_array[j_count].trim();
while (code_line != "END WHILE")
  {
    j_count ++
    code_line = code_array[j_count].trim();
  }
end_pt = j_count
return start_pt + "~" + end_pt
}

function find_if_points()
{
  j_count ++;
  else_pt = -1
  start_pt = j_count;
  code_line = code_array[j_count].trim();
  while (code_line != "END IF")
  {
    code_line = code_array[j_count].trim();
    if (code_line == "ELSE")
    {else_pt = j_count+1}
    j_count ++
  }
  end_pt = j_count - 1
  if (else_pt == -1){else_pt = end_pt}
  return start_pt + "~" + else_pt + "~" + end_pt
}

// Imparts correct action on a key word from the program
function  do_action(my_res)
{
  if (my_res.trim() == "")
    {}
    else{
    check = mymodule.parse(code_array[j_count])
    s = check[0].split("~")
    // for assignmnet replace variables after equal sign with 
    if (s[0] == "assignment")
    {
      //find the equal sign
      r = code_array[j_count].search("=")
      //replace any variables after = sign with their values and recompose the string
      str = code_array[j_count].substring(0,r) + replace_variables(code_array[j_count].substring(r, code_array[j_count].length))
      //re-parse the line
      // check = mymodule.parse(str)
      //  s = check[0].split("~")
    }
    else
    {
      if (s[0] == "input")
      {
        //find the equal sign
        r = code_array[j_count].search("=")
        //replace any variables after = sign with their values and recompose the string
        str = code_array[j_count].substring(0,r) + replace_variables(code_array[j_count].substring(r, code_array[j_count].length))
        //re-parse the line
        // check = mymodule.parse(str)
        //  s = check[0].split("~")
        str = s[1] + "=" + input_values[input_pointer]
        input_pointer ++
      }
      else
      {
      str = replace_variables(code_array[j_count])
      }
    }
  }


  // parse the correct line of code
  //alert ("parse " + str)
  check = mymodule.parse(str)
  //alert(check)
  // split the result ready for action on the key word
  s = check[0].split("~")
  //alert(s)
  // check key word exists and do the action
  if (pseudo_code_words.includes(s[0]))
  {
   //alert (s)
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
 count = 0
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
