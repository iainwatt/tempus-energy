
$(document).ready(function() {

	$( "#target" ).submit(function( event ) {

		$("#energy-data").text("")
		$("#table-info").text("")
		var my_sp = $("#time_pick").val();
		var dd_day = $("#day_pick").val();
	  var my_month = $('#month').val();
	  var my_time = $('#time').val();
	  var my_date = "2015-05-"+dd_day;
  	$.ajax({
    	type: 'GET',
    	url: "http://localhost:3000/HIST_FUELINST"
  	})
  	.done(function(response) {	


  		// declare the varibales we will be using 
  		var ic = [], nonIC = [], nonClass, CCGT = [], OCGT = [], GAS = [], OIL = [], COAL = [], NUCLEAR = [], WIND = [], PS = [], NPSHYD = [], OTHER = [], INTFR = [], INTIRL = [], INTNED = [], INTEW = [], totalNonIC = [], totalInterCont = [], totalEnergy = [], merged = [], sortedData = [];
  		// helper sum function
  		var sumNum = function(a,b) {
	        return a + b;
	    }; 
    
  		// now we sort the date for the time and date requested 
    	for (i = 0, x = response.INST.length; i < x; i++) {
        if (response.INST[i]._SD === my_date && response.INST[i]._SP === my_sp ) {
            sortedData.push(response.INST[i].FUEL);
        }
      }

      // and merge all the data as one sp consittutes 6 array elements 
	    merged = merged.concat.apply(merged, sortedData)
	
	    if (merged[0] === undefined) { alert("sorry, no data for this time period, try another")}
      // split up the data into foreign and domestic and find total 
	    for (i = 0, x = merged.length; i < x; i++) {

	        totalEnergy.push(merged[i]._VAL);
	        if (merged[i]._IC == "N") { nonIC.push(merged[i]) }
	        else if (merged[i]._IC == "Y") { ic.push(merged[i]) }
	        else { nonClass.push(merged[i]) }
	    }
		
	  	totalEnergy = totalEnergy.map(Number).reduce(sumNum);


	   // sorting all nonIC energy types into there own variable
    	for (i = 0, y = nonIC.length; i < y; i++) {
        totalNonIC.push(nonIC[i]._VAL);
        // console.log(totalNonIC);
        switch (nonIC[i]._TYPE) {
         case "CCGT":
            CCGT.push(nonIC[i]._VAL);
            break;
         case "OCGT":
             OCGT.push(nonIC[i]._VAL);
             break;
        case "OIL":
            OIL.push(nonIC[i]._VAL);
            break;
        case "COAL":
            COAL.push(nonIC[i]._VAL);
            break;
        case "NUCLEAR":
            NUCLEAR.push(nonIC[i]._VAL);
            break;
        case "WIND":
            WIND.push(nonIC[i]._VAL);
            break;
        case "PS":
            PS.push(nonIC[i]._VAL);
            break;
        case "NPSHYD":
            NPSHYD.push(nonIC[i]._VAL);
            break;
        case "OTHER":
            OTHER.push(nonIC[i]._VAL);
            break;
        case "INTFR":
            INTFR.push(nonIC[i]._VAL);
            break;
        case "INTIRL":
            INTIRL.push(nonIC[i]._VAL);
            break;    
        case "INTNED":
            INTNED.push(nonIC[i]._VAL);
            break;    
        case "INTEW":
            INTEW.push(nonIC[i]._VAL);
            break;    
        } 
    	}

    	// Finding total Power generated domestically 
	    totalNonIC = totalNonIC.map(Number).reduce(sumNum);
	    
	    // summing all values 
	    CCGT = CCGT.map(Number).reduce(sumNum);
	    OCGT = OCGT.map(Number).reduce(sumNum);
	    GAS = CCGT + OCGT;
	    OIL = OIL.map(Number).reduce(sumNum);
	    COAL = COAL.map(Number).reduce(sumNum);
	    NUCLEAR = NUCLEAR.map(Number).reduce(sumNum);
	    WIND = WIND.map(Number).reduce(sumNum);
	    PS = PS.map(Number).reduce(sumNum);
	    NPSHYD = NPSHYD.map(Number).reduce(sumNum);
	    OTHER = OTHER.map(Number).reduce(sumNum);
	    nOTHER = PS + OTHER

	    var pGAS = GAS/totalEnergy * 100

	    // finding the value of the imported energy 
    	for (i = 0, z = ic.length; i < z; i++) {
        totalInterCont.push(ic[i]._VAL);
    	}   		
    	totalInterCont = totalInterCont.map(Number).reduce(sumNum);  
    	console.log("Total Energy used = " + totalEnergy + "\nProduced domestically = " + totalNonIC + "\nImported = " + totalInterCont + "\nCheck = " + (totalNonIC + totalInterCont));

    	var time_remind = '<div class="reminder">';
    				time_remind += '<h3>Energy Used on: ' + my_date + ' in settlement perdiod: ' + my_sp + '</h3>';
    				time_remind += '</div>' 


    	// populating html
        var ht_table = '<table class="energy-table">';
        	ht_table += '<tr>';
        		ht_table += '<th> Energy </th>';
        		ht_table += '<th> KW </th>';
        		ht_table += '<th> % </th>';
        	ht_table += '</tr>';
        	ht_table += '<tr>';
        		ht_table += '<td> Domestic </td>';
        		ht_table	+= '<td>' + totalNonIC + '</td>';
        		ht_table	+= '<td>' + (totalNonIC/totalEnergy * 100).toFixed(0) + '</td>';
        	ht_table += '</tr>'
        	ht_table += '<tr>';
        		ht_table += '<td> Foreign </td>';
        		ht_table	+= '<td>' + totalInterCont + '</td>';
        		ht_table	+= '<td>' + (totalInterCont/totalEnergy * 100).toFixed(0) + '</td>';
        	ht_table += '</tr>'
        	ht_table += '<tr>';
        		ht_table += '<td> TOTAL </td>';
        		ht_table	+= '<td>' + totalEnergy + '</td>';
        		ht_table	+= '<td> 100 </td>';
        	ht_table += '</tr>'
        	ht_table += '</table>';

        var domestic_usage = '<table class="domestic-table">'
        	domestic_usage += '<caption>Breakdown of Domestic Usage</caption>'
	        domestic_usage += '<tr>';
        		domestic_usage += '<th> Type </th>';
        		domestic_usage += '<th> KW </th>';
        		domestic_usage += '<th> % </th>';
	        domestic_usage += '</tr>';
	        domestic_usage += '<tr>';
        		domestic_usage += '<td> GAS </td>';
        		domestic_usage	+= '<td>' + GAS + '</td>';
        		domestic_usage	+= '<td>' + (GAS/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> OIL </td>';
        		domestic_usage	+= '<td>' + OIL + '</td>';
        		domestic_usage	+= '<td>' + (OIL/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> COAL </td>';
        		domestic_usage	+= '<td>' + COAL + '</td>';
        		domestic_usage	+= '<td>' + (COAL/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> NUCLEAR </td>';
        		domestic_usage	+= '<td>' + NUCLEAR + '</td>';
        		domestic_usage	+= '<td>' + (NUCLEAR/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> WIND </td>';
        		domestic_usage	+= '<td>' + WIND + '</td>';
        		domestic_usage	+= '<td>' + (WIND/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> HYDRO </td>';
        		domestic_usage	+= '<td>' + NPSHYD + '</td>';
        		domestic_usage	+= '<td>' + (NPSHYD/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> OTHER </td>';
        		domestic_usage	+= '<td>' + nOTHER + '</td>';
        		domestic_usage	+= '<td>' + (nOTHER/totalNonIC * 100).toFixed(0) + '</td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<tr>';
        		domestic_usage += '<td> TOTAL </td>';
        		domestic_usage	+= '<td>' + totalNonIC + '</td>';
        		domestic_usage	+= '<td> 100 </td>';
        	domestic_usage += '</tr>';
        	domestic_usage += '<table>'

      // $('#energy-data').append(data_table); 
      $('#table-info').append(time_remind);
      $('#energy-data').append(ht_table);   
      $('#energy-data').append(domestic_usage);       


  	});

	  event.preventDefault();
	  
	});

});

