
var forms = [];
var forms_html = [];


(function ( $ ) {

  $.fn.hasAttr = function(atribute) {
    var attr = $(this).attr(atribute);
    if (typeof attr !== typeof undefined && attr !== false) {
      return true;
    }else{
      return false;
    }
  };

}( jQuery ));

$(document).ready(function(){

  get_forms();
  submit_form();

  var form_prueba = $('#new_user')[0];
  $('footer .container').click(function(){
    form_prueba = $('<div/>').html(form_prueba).contents();
  });
});


function get_forms(){
  $('form').each(function(){
    var elem = $(this).clone();
    var form = [];
    form['id'] = elem.attr('id');
    form['validation'] = elem.attr('class').indexOf('validation') == -1 ? false : true;
    form['action'] = elem.attr('action');
    elem.attr('action', '');
    forms.push(form);
    forms_html.push(elem);
  });
}

function validation_form(id, e) {
  $('#'+id).find('input:not([type="submit"])').each(function(){

    var name = $(this).attr('name');

      var this_form = get_form(id);


      if (this_form.find('input[name="'+name+'"]').length == 0){
        e.preventDefault();
        message_form($('#'+id), 'Ha ocurrido un error, actualiza y vuelve a intentarlo por favor', false);
        return false;
      }

      var val = $(this).val();
      var required = $(this).hasAttr('class') == true ? ($(this).attr('class').indexOf('required') == -1 ? false : true) : false;
      var max_lenght = this_form.find('input[name="'+name+'"]').hasAttr('maxlength') == true ? this_form.find('input[name="'+name+'"]').attr('maxlength') : false;
      var min_lenght = this_form.find('input[name="'+name+'"]').hasAttr('minlength') == true ? this_form.find('input[name="'+name+'"]').attr('minlength') : false;
      var clear = true;

      if (required && val.length == 0){
        e.preventDefault();
        message_form($(this), 'Este campo es obligatorio', false);
        return false;
      }

      var regex = [];
      var message = [];

      if (max_lenght !== false)
        check_max_lenght(regex, message, max_lenght);
      if (min_lenght !== false)
        check_min_lenght(regex, message, min_lenght);

      //Here you can change the regex code for different control of input value

      switch ($(this).attr('type')) {
        case 'text':
          regex.push(new RegExp('^[A-Za-z0-9]{'+val.length+'}$'));
          message.push('Caracteres no válidos!!');
          break;
        case 'email':
          regex.push(new RegExp('^.+@.+[.].+'));
          message.push('Email no válido, tiene que ser del tipo "algo@algo.algo"');
          break;
        case 'password':
          regex.push(new RegExp('^(?=.*[A-Z]+)(?=.*[!@#$&()=%*]+)(?=.*[0-9]+)(?=.*[a-z]+).{0,12}$'));
          message.push('Contraseña débil al menos tiene que tener un <b>número</b></br> una <b>letra</b> (mayuscula y minúscula)</br> y un caracter <b>especial</b>');
          break;
        default:
          e.preventDefault();
      }

      for (var i=0;i<regex.length; i++) {
        if (!regex[i].test(val)){
          clear = false;
          e.preventDefault();
          message_form($(this), message[i], clear);
          return false;
        }
      }

      if (clear) message_form($(this), '', clear);

  });
  e.preventDefault();
}

function check_min_lenght(regex, message, min_lenght){
  var parte1 = '^[A-Za-z0-9]{';
  var parte2 = ',}$';
  regex.push(new RegExp(parte1+min_lenght+parte2));
  message.push('Como mínimo debe haber '+min_lenght+' caracter(es)');
}
function check_max_lenght(regex, message, max_lenght){
  var parte1 = '^[A-Za-z0-9]{0,';
  var parte2 = '}$';
  regex.push(new RegExp(parte1+max_lenght+parte2));
  message.push('Como máximo puede haber '+max_lenght+' caracter(es)');
}

function submit_form(){
  $('form input[type="submit"]').click(function(e){

    $(this).closest('form').find('.message_input_form').empty();
    var prevent = true;
    var id = $(this).closest('form').attr('id');

    for (var i=0;i<forms.length;i++) {
      if (id == forms[i]['id'] && $('#'+forms[i]['id']).length){
        prevent = false;
        if (forms[i]['validation']){
          validation_form(forms[i]['id'], e);
        }
      }
    }

    if (prevent) e.preventDefault();
  });
}

function get_form(id){

  for (var i=0;i<forms_html.length;i++) {
    if (forms_html[i].attr('id') == id){
      return forms_html[i];
    }
  }
}

function message_form(element, message, clear){

  message = '<p>'+message+'</p>';
  var index =element.next().hasAttr('class') == true ? element.next().attr('class').indexOf('message_input_form') : -1;

  if (index == -1){
    if (!clear)
    element.after('<div class="message_input_form">'+message+'</div>');
  }else{
    if (clear){
      element.next().empty();
    }else{
      element.next().html(element.next().html() + message);
    }
  }
}












/**/
