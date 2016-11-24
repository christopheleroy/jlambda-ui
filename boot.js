define(

function(require)
{

  return {
    initialize: initialize,
  };



  function initializeRoutes()
  {

    // routing
    var routes = {
      '/admin': {
        '/user': adminUser,
        '/study': {
          '':adminStudyDash,
          '/':adminStudyDash,
          '/:protocol':adminStudy
        },
        '/freq':'',
        '/reports': function() {
            window.open('http://go/aspcompliance','_blank');
            setTimeout(function() { window.location.hash="/admin"; tiles(); }, 1000);
          },
        '': tiles,
        '/drug':''
      },
      '/tiles': {
        '/(\\d+)*': tiles,
      },
      '/': dashboard,
      '/dashboard': dashboard,
      '/dash': dashboard, // home page
      '/download-inv': downloadInv,
      '/protocast': {
        '/(\\S+)': planning
      },
      '/study': {
        '/(\\S+)': studyCentricView,
      },
      '/download-csv': downloadCsv,
      '/triage': {
        '/(\\d+)': triage,
        '': triage
      },
      // examples below:
      '/x': {
        '/(\\d+)': { // example of regex for dynamic route, this could
          // also be a varname like '/:foo'
          on: function(match)
          {} // trigger event with rx match passed
        // as arg, or the value of 'foo' as in
        // comment above
        },
        on: function()
        {}, // /x function
      },
      '/y': function()
      {}, // /y function
    };

    var whenNoHash = function()
    {
      if ((window.location.hash == "" || window.location.hash == "#") && $('.nest').children().length == 0)
      {
        dashboard();
      }
    };
    var gRouteConf = []; // list of functions to call on EVERY route
    var router = new Router(routes || {}).configure({
      on: gRouteConf
    }).init();
    whenNoHash();
  };



  function initialize(config)
  {
    require([ 'jquery', 'bootstrap', 'lodash', 'ace', 'director'],
    function($, bootstrap, _, z_ace, director)
    {
      // load config
      if (_.isString(config))
      {
        try
        {
          config = JSON.parse(config);
        }
        catch (e)
        {
          alert("Configuration cannot be parsed...\nNothing is going to work...");
          config = {};
        }
      }


      // set ajax defaults
      $.ajaxSetup({
        type: 'GET',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        cache: false
      });

      var editor = ace.edit("jseditor");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/json");

      var resd = ace.edit("results");
      resd.setTheme("ace/theme/monokai");
      resd.getSession().setMode("ace/mode/json");

      $("#go").click(function() {
        var value = editor.getValue();
        var jlambda = require("jlambda");
        var jval = JSON.parse(value);
        var payload = jval.payload;
        var lambda = jval.lambda;
        var ctx = jlambda.context();
        var lFN = jlambda.functionator(lambda,ctx);
        if(lFN) {
          ctx = jlambda.context(payload)
          var outCtx = {failed:true};
          try {
            outCtx = lFN(ctx);
            if(outCtx && !outCtx.failed) {
              $("#results").html(JSON.stringify(outCtx.outp));
            }
          }catch(e) {
            alert("Error!");
            console.log(e);
          }
          if(!outCtx) {
            alert("null output...");
          }else if(outCtx.failed) {
            alert("failed...");
            console.log(outCtx);
          }
        }else{
          alert("jLambda expression incorrect");
        }
        $(".jlam-home p").remove();
      });

   }); // end of 'internal require' (internal to 'initialize')
  }; // end of initialize
});
