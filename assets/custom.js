$(document).ready(function(){
  // $('ul.itg_menu li').mouseover(function(){
  // //alert('ggg');
  //   $(this).find('.itg_details_headermenu summary').trigger('click');
  // });
  $('.itg_search_icon').click(function(){
    $('.itg_search_popup').slideToggle('active');
  });
  $('.popular-items.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});
 
  
  $(".img_producto_container").on("mouseover", function() {
        $(this).find(".img_producto").css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
    })
  $(".img_producto_container").on("mouseover", function() {
    $(this).find(".img_producto").css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  $(".img_producto_container") .on("mouseout", function() {
    $(this).find(".img_producto").css({ transform: "scale(1)" });
  })
  $(".img_producto_container") .on("mousemove", function(e) {
    $(this).find(".img_producto").css({"transform-origin":((e.pageX - $(this).offset().left) / $(this).width()) * 100 +"% " +((e.pageY - $(this).offset().top) / $(this).height()) * 100 +"%"});
  });

  // product page varinat change title and sku  
  // $('.itg_variant_option').change(function() {
  //   var option_name = $(this).val();
  //    //alert(option_name);
  //   $('.product__title h1 span').text(option_name);
    
  // });

   var altHandle = $('.product-form__input--dropdown select').find(":selected").attr('data-value');
   if(altHandle != undefined){
       $(".itg_slider_desktop .product__media-item").addClass("hide").removeClass("is-active").removeClass("cvariant-image cvariant-item");
       $(".itg_slider_desktop .product__media-item").each(function () {
         $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide").addClass("cvariant-image cvariant-item");
       });
       $(".itg_slider_desktop .product__media-item.alt_" + altHandle).eq(0).addClass("is-active");
       $(".itg_thumbnail li.thumbnail-list__item").addClass("hide");
       $(".itg_thumbnail li.thumbnail-list__item .global-media-settings").removeAttr('aria-current');
        $(".itg_thumbnail li.thumbnail-list__item").each(function () {
          $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide");
        });
        $(".itg_thumbnail li.thumbnail-list__item.alt_" + altHandle).eq(0).find(".global-media-settings").attr("aria-current","true").click();
        var variant_title = $('.product-form__input--dropdown select').find(":selected").attr("value");
        var varinat_sku = $('.product-form__input--dropdown select').find(":selected").attr("var_sku");
         $('.product__title h1 span').text(variant_title);
         $('.product__title p span').text(varinat_sku);
         $('.itg_variant_sku p').text(varinat_sku);
    }

  //inner pages tab script
    $(".itg_tab_list span").click(function(e) {
        var tabName = $(this).attr('data-id');
        $(this).addClass('active_tabs').siblings().removeClass('active_tabs');
        $('.itg_tab_details .itg_tab_content').each(function() {
            var tabName_box = $(this).attr('data-id');
            if (tabName_box == tabName) {
              $(this).addClass('itg_active_content');
            }else{
              $(this).removeClass('itg_active_content');
            }
        })
    });

//bottom popup cookie setup
  $("#cookieconsent-modal").removeClass('hide');
$(".cookieconsent-dismiss").click(function () {      
      $.cookie('cookieconsent', 'accepted', { expires: 365 });
         $("#cookieconsent-modal").slideUp(function(){
				$(this).addClass("hide")
			});
     });    
      var cookieshowhide = $.cookie('cookieconsent');
  if(cookieshowhide == 'accepted') {
    $("#cookieconsent-modal").slideUp(function(){
				$(this).addClass("hide")
			});
	}

//product page selected variant content
$(document).on('change', '.product-form__input .select__select', function(){
 // alert()
  var selected_variant = $(this).find('option:selected').attr('var_sku');
  //alert(selected_variant);
  var html1 = $(document).find('#data_1.itg_tab_data[data="'+selected_variant+'"]').html();
  var html2 = $(document).find('#data_2.itg_tab_data[data="'+selected_variant+'"]').html();
   $(document).find('#tab1.tab-content.tab1').html(html1);
   $(document).find('#tab2.tab-content.tab2').html(html2);
  // console.log(html1);
  // console.log(html2);
});

  
//product page custom tab
// Show the first tab and hide the rest
$('#tabs-nav li:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first-child').show();

// Click function
$('#tabs-nav li').click(function(){
  $('#tabs-nav li').removeClass('active');
  $(this).addClass('active');
  $('.tab-content').hide();
  
  var activeTab = $(this).find('a').attr('href');
  $(activeTab).fadeIn();
  return false;
});

   //preductive search 
    $('form[action="/search"]').css('position', 'relative').each(function () {
      
    var input = $(this).find('input[name="q"]');
    var offSet = input.position().top + input.innerHeight();
    $('<ul class="search-results"></ul>').css({'position': 'absolute','left': '0px','top': offSet}).appendTo($(this)).hide();

    input.attr('autocomplete', 'off').bind('keyup change', function () {
      var term = $(this).val();
      var form = $(this).closest('form');
      var resultsList = form.find('.search-results');

      jQuery.getJSON("/search/suggest.json", {
        "q": term,
        "resources": {
          "type": "product",
          "limit": 4,
          "options": {
            "unavailable_products": "hide",
            "fields": "title,product_type,variants.title,tag,variants.sku"
          }
        }
      }).done(function (response) {

        resultsList.empty();

        var productSuggestions = response.resources.results.products;

        if (productSuggestions.length > 0) {

          $.each(productSuggestions, function (index, item) {
            var link = $('<a></a>').attr('href', item.url);
            link.append('<div class="itg_thumbnail"><img src="' + item.image + '" /></div>');
            link.append('<div class="itg_prouct_data"><h3 class="title">' +item.title + '</h3> <span class="price">' +'$'+item.price + '</span></div>');
            //link.append('<span class="price">' +'$'+item.price + '</span>');
            //link.wrap('<div class="itg_prouct_data"></div>');
            link.wrap('<li></li>');
            resultsList.append(link.parent());
          });
          resultsList.fadeIn(100);
        } else {
          resultsList.html('<li><span class="title">No results.</span></li>');           
        }
      });

    });
  });
  $('body').bind('click', function () {
    $('.search-results').hide();
  });
});
  // header sticky
//    $(window).scroll(function(){
//     if ($(window).scrollTop() >= 100) {
//       setTimeout(function() {
//         $('.header-wrapper').addClass('fixed');
//         $('.announcement-bar').css("opacity", 0);
//         }, 500);
//      //   $('nav div').addClass('visible-title');
//      // alert()
//     }
//     else {
//       setTimeout(function() {
//         $('.header-wrapper').removeClass('fixed');
//         $('.announcement-bar').css("opacity", 1);
//        }, 500);
//       //  $('nav div').removeClass('visible-title');
//     }
// });
