require.config({
		waitSeconds: 0,
		baseUrl: '',
    urlArgs: 'v=rRELEASETAG',
    paths: {

    	// External Artifacts
      d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/4.3.0/d3.min",
			bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
      datatables:   "http://cdn.datatables.net/1.10.11/js/jquery.dataTables",
        // combined datatables + select + buttons + more stuff :
        // "datatables": "https://cdn.datatables.net/t/dt/dt-1.10.11,b-1.1.2,b-colvis-1.1.2,se-1.1.2/datatables.min",
    	flight:       "https://cdnjs.cloudflare.com/ajax/libs/flight/1.1.4/flight",
    	jquery:       "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery",
    	lodash:		    "http://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.0/lodash.min",
    	autocomplete: "https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.21/jquery.autocomplete",
    	moment:       "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment",
    	hogan:        "https://cdnjs.cloudflare.com/ajax/libs/hogan.js/3.0.2/hogan",
    	director:     "https://cdnjs.cloudflare.com/ajax/libs/Director/1.2.8/director.min",
			text:         "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
			ace: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace",
			"ace-json": "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/mode-json",
			jlambda: "jlib/jlambda-core"
    },

    map: {
    },
    shim: {
    	bootstrap: { deps : ["jquery"] },
      flight:    { deps : ["jquery"], exports: 'flight'},
      autocomplete:   { deps : ["jquery","jqueryui"], exports: 'autocomplete'},
			ace: { deps: [], exports: 'ace'},
			jlambda: { deps: ['lodash']}
    },
    packages: [
    ]
});

require(
[

],
function() {
  require(['boot','text!config.json'],function(Boot,config){
  	Boot.initialize(config);
  });
});
