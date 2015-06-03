


// var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

// function populatedropdown(dayfield, monthfield, yearfield, timefield){
// 		var today=new Date()
// 		var dayfield=document.getElementById(dayfield)
// 		var monthfield=document.getElementById(monthfield)
// 		var yearfield=document.getElementById(yearfield)
// 		var timefield=document.getElementById(timefield)

// 			var options = [];
// 			for (i=0; i < 49; i++) { options.push(i); }

// 			for(var i = 0; i < options.length; i++) {
//     		var opt = options[i];
//     		var el = document.createElement("option");
//     		el.textContent = opt;
//     		el.value = opt;
//     		timefield.appendChild(el);
// 			}
	
// 		for (var i=1; i<32; i++) 
// 			dayfield.options[i]=new Option(i, i+1)
// 			dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true) //select today's day

// 		for (var m=0; m<12; m++)
// 			monthfield.options[m]=new Option(monthtext[m], monthtext[m])
// 			monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true) //select today's month
// 			var thisyear=today.getFullYear()

// 		for (var y=0; y<3; y++){
// 			yearfield.options[y]=new Option(thisyear, thisyear)
// 			thisyear-=1
// 		}
// 		yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
// }


// window.onload=function(){
// populatedropdown("daydropdown", "monthdropdown", "yeardropdown", "timedropdown")

$(document).ready(function() {

	$( "#td-picker" ).submit(function( event ) {
		console.log("clicked");
	});	

	$( "#target" ).submit(function( event ) {
	  var my_day = $('#day').val();
	  var my_month = $('#month').val();
	  var my_time = $('#time').val();
	  var my_date = $('#date').val();
	  var my_sp = $('#sp').val();
	  
  	$.ajax({
    	type: 'GET',
    	url: "http://localhost:3000/HIST_FUELINST"
  	})
  	.done(function(response) {	
  		// console.log(response.INST);
  		// console.log(response.INST.length);
  		// console.log(my_sp);


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

      // split up the data into foreign and domestic and find total 
	    for (i = 0, x = merged.length; i < x; i++) {
	        totalEnergy.push(merged[i]._VAL);
	        if (merged[i]._IC == "N") { nonIC.push(merged[i]) }
	        else if (merged[i]._IC == "Y") { ic.push(merged[i]) }
	        else { nonClass.push(merged[i]) }
	    }
	  	totalEnergy = totalEnergy.map(Number).reduce(sumNum);
	  	// console.log(totalEnergy);

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

	    // finding the value of the imported energy 
    	for (i = 0, z = ic.length; i < z; i++) {
        totalInterCont.push(ic[i]._VAL);
    	}   		
    	totalInterCont = totalInterCont.map(Number).reduce(sumNum);  
    	console.log("Total Energy used = " + totalEnergy + "\nProduced domestically = " + totalNonIC + "\nImported = " + totalInterCont + "\nCheck = " + (totalNonIC + totalInterCont));

    	var data_table = '<div class="energy-card">';
    					data_table += '<h1>TOTAL ENERGY: ' + totalEnergy + '</h1>';
    					data_table += '<h1>TOTAL DOMESTIC: ' + totalNonIC + '</h1>';

              data_table += '<h2>GAS: ' + GAS + '</h2>';
              data_table += '<h2>OIL: ' + OIL + '</h2>';
              data_table += '<h2>COAL: ' + COAL + '</h2>';
              data_table += '<h2>NUCLEAR: ' + NUCLEAR + '</h2>';
              data_table += '<h2>WIND: ' + WIND + '</h2>';
              data_table += '<h1>TOTAL IMPORTED: ' + totalInterCont + '</h1>';
              data_table += '</div>';
      $('#energy-data').append(data_table);        
  	});

	  event.preventDefault();
	 
	  
	  
	});

});

