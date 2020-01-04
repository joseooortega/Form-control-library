# Form-control-library
Javascript functions that helps to validate html formularies.

With this library you won't worry about the validation of your forms even if you edit the html code by browser tools. If the library detects that the user has changed the form, the library won't let the user submit.

Obviously to get a full security, you will need to check the form data on the server side.

To use this library, all you need to do is add this js file at your application web and put the different attributes to your form. Depending of witch attributes you put on the form, the library will control the value of the inputs:



### Form attributes
  - class="validation" -> The library will act on this form.

### Input attributes
  - class="required" -> input required to submit the form.
  - max_lenght="X" -> Maximum allowed characters.
  - min_lenght="X" -> Minimum characters allowed.
  
The library will filter the input value with regex depending on the type attribute of input:

### Input types attributes
  - text -> Allowed letters and numbers.
  - email -> Allowed valid emails (some@some.some)
  - password -> Allowed only passwords that contain almost: one number, one lowercase letter, one uppercase letter and one special        character
