// CCGT Open Cycle Gas Tubine (Gas)
// OCGT Closed Cycle Gas Tubine (Gas)
// OIL Oil
// COAL Coal
// NUCLEAR Nuclear
// WIND Wind
// PS Pumped Storage (Other)
// NPSHYD Hydroelectric
// OTHER Other

// IC fuels 
// INTFR Interconnect to and from France
// INTIRL Interconnect to and from Ireland
// INTNED Interconnect to and from The Netherlands
// INTEW East-West Interconnect (To and from Ireland)
// IC This fuel type is an interconnect

// What we want
// • Coal
// • Gas = CCGT, OCGT
// • Oil
// • Hydroelectric = NPSHYD
// • Nuclear
// • Wind
// • Interconnect
//   Other = PS, OTHER


// this will sort by date and sp
function datSort(objArr, date, sp) {
    var sortedData = [];
    for (i = 0, x = objArr.length; i < x; i++) {
        if (objArr[i]._SD === date && objArr[i]._SP === sp ) {
            sortedData.push(objArr[i].FUEL);
        }
    }
}

            
function count (objArr) {
    var ic = [], nonIC = [], nonClass, CCGT = [], OCGT = [], GAS = [], OIL = [], COAL = [], NUCLEAR = [], WIND = [], PS = [], NPSHYD = [], OTHER = [], INTFR = [], INTIRL = [], INTNED = [], INTEW = [], totalNonIC = [], totalInterCont = [], totalEnergy = [], merged = [];
    
    var sumNum = function(a,b) {
        return a + b;
    }; 

    merged = merged.concat.apply(merged, objArr);
    // split up the data types and find total
    for (i = 0, x = merged.length; i < x; i++) {
        totalEnergy.push(merged[i]._VAL);
        if (merged[i]._IC == "N") { nonIC.push(merged[i]) }
        else if (merged[i]._IC == "Y") { ic.push(merged[i]) }
        else { nonClass.push(merged[i]) }
    }

    
    // split up the data types and find total
    for (i = 0, x = objArr.length; i < x; i++) {
        totalEnergy.push(objArr[i]._VAL);
        if (objArr[i]._IC == "N") { nonIC.push(objArr[i]) }
        else if (objArr[i]._IC == "Y") { ic.push(objArr[i]) }
        else { nonClass.push(objArr[i]) }
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

    // finding the value of the imported energy 
    for (i = 0, z = ic.length; i < z; i++) {
        totalInterCont.push(ic[i]._VAL);
    }  
    totalInterCont = totalInterCont.map(Number).reduce(sumNum);  


}

count(fuel);

