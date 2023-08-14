
    
   var tankcapacity=prompt("Enter Your Tank Height");
    
   var status;
   var motor;
   state();
   var value=0;
   
   if(value==0){
		fetch('https://chemical-level-indicator.000webhostapp.com/set_tank_capacity.php?tank_capacity=tankcapacity')
		   .then(data => {
		   console.log(tankcapacity);
		   })
   }
   
   
   function state(){
		const api_url =  "https://chemical-level-indicator.000webhostapp.com/get_Supply_status.php";
 
// Defining async function
async function getapi(url) {
   
   // Storing response
   const response = await fetch(url);
   
   // Storing data in form of JSON
   var data = await response.json();
   console.log(data);
   status=data.status;
 

}
// Calling that async function
getapi(api_url);
   }
   
   
//////////////// MANUALY MOTOR  ON   /////////////////////////////////////////////////////////////////////////////
   function enable(){
	 status=1;
		fetch('https://chemical-level-indicator.000webhostapp.com/set_Supply_status.php?status=1')
		   .then(data => {
		   console.log("MOTOR_ON");
		   })
		alert("MOTOR-ON");
   }
   
   
///////////// MANUALY MOTOR OFF    ///////////////////////////////////////////////////////////////
   function disable(){
	   status=0;
	   fetch('https://chemical-level-indicator.000webhostapp.com/set_Supply_status.php?status=0')
		   .then(data => {
		   console.log("MOTOR_OFF");
		   })
		  
	   alert("MOTOR_OFF");
   }
   


/////////////   AUTOMATIC-ENABLE //////////////////////////////////////////////////////////////////////////////
   
	function autoenable(){
	 status=1;
	 fetch('https://chemical-level-indicator.000webhostapp.com/set_Supply_status.php?status=1')
		   .then(data => {
		   console.log("MOTOR_ON");
		   })
		 alert("Water  reach  its Minimum Stage\n" + "Motor ON");
   }
   
   
/////////////   AUTOMATIC DISABLE   ////////////////////////////////////////////////////////////////////////
   
   function autodisable(){
	   status=0;
		fetch('https://chemical-level-indicator.000webhostapp.com/set_Supply_status.php?status=0')
		   .then(data => {
		   console.log("MOTOR_OFF");
		   })
		  
	   alert("Water  reach  its Maximum Stage\n" + "Motor OFF");
   }

///////////// Forcefully MOTOR ON/OFF    ///////////////////////////////////////////////////////////////
   function force(){
	   if(status==0){
	   alert("Motor is OFF")
	   }
	 else if(status==1){
	   alert("Motor is ON")
	   }
	
   }

///////// //////////////CHEMICAL LEVEL   ///////////////////////////////////////////////////////////////////////////

var delay = 1000,
   level = 0,
   levelStore = 0,
   tick = 1,
   tickStore = 1,
   tickDiff = 0,
   tickDifflevel = 0;
function valBetween(v, min, max) {
   return Math.min(max, Math.max(min, v));
}
(function loop() {
   
const api_url =  "https://chemical-level-indicator.000webhostapp.com/get_Chemical_level.php";
 
// Defining async function
async function getapi(url) {
   
   // Storing response
   const response = await fetch(url);
   
   // Storing data in form of JSON
   var data = await response.json();
   console.log(data);
   level=data.level;
  
   if(level<0 || level>100){
	   $("#gauge-label1").text("I/P Error");
   }
   else{
   $("#gauge-label1").text(level);
   }
			
   

}
// Calling that async function
getapi(api_url);

		 if(level<0 || level>20){
		 $("#gauge-label1").text("I/P Error");
   }
   else{
   $("#gauge-label1").text(level);
   }
	  
   tick = valBetween(Math.ceil((level / 100) * 28), 1, 28);
   tickDiff = Math.abs(tick - tickStore);
   tickDifflevel = Math.abs(level - levelStore) / tickDiff;

   var counter = 0,
   levelStoreTemp = levelStore,
   tickStoreTemp = tickStore;
if (level > levelStore) {
   for (i = tickStoreTemp; i <= tick; i++) {
	   (function (i) {
		   setTimeout(function () {
			   $("#guage2").css(
				   "background-image",
				   "linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(" +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill +
					   ", " +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill +
					   " 50%, #fff 50%)"
			   );
			   $("#gauge2").css(
				   "box-shadow",
				   "0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px " +
					   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
					   ", inset 0 0 2px -1px " +
					   $("#gauge path:nth-child(" + i + ")")[0].style.fill
			   );
			   $("#gauge2 path:nth-child(" + i + ")").show();
			   $("#gauge-label1")
				   .css("color", $("#gauge2 path:nth-child(" + i + ")")[0].style.fill)
				   .text(
					   Math.ceil(levelStoreTemp + tickDifflevel * Math.abs(tickStoreTemp - i))
				   );
			   if (i == tick) {
			   if(level<0 || level>20){
		$("#gauge-label1").text("I/P Error");
   }
   else{
   $("#gauge-label1").text(level);
   }
			   }
		   }, 50 * counter);
		   counter++;
	   })(i);
   }
} 
else if (level < levelStore) {
   for (i = tickStoreTemp; i >= tick; i--) {
	   (function (i) {
		   setTimeout(function () {
			   $("#gauge2").css(
				   "background-image",
				   "linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(" +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill +
					   ", " +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill +
					   " 50%, #fff 50%)"
			   );
			   $("#gauge2").css(
				   "box-shadow",
				   "0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px " +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill +
					   ", inset 0 0 2px -1px " +
					   $("#gauge2 path:nth-child(" + i + ")")[0].style.fill
			   );
			   $("#gauge2 path:nth-child(" + i + ")").hide();
			   $("#gauge-label1")
				   .css("color", $("#gauge2 path:nth-child(" + i + ")")[0].style.fill)
				   .text(
					   Math.floor(levelStoreTemp - tickDifflevel * Math.abs(tickStoreTemp - i))
				   );
			   if (i == tick) {
				   if(level<0 || level>20){
	   $("#gauge-label1").text("I/P Error");
   }
   else{
   $("#gauge-label1").text(level);
   }
			   }
		   }, 50 * counter);
		   counter++;
	   })(i);
   }
}
levelStore = level;
tickStore = tick;
window.setTimeout(loop, delay);


})();

		 
////////////////////////   CHEMICAL PERCENT   ///////////////////////////////////////////////////////////////////////
/////////////////////////                  //////////////////////////////////////////////////////////////////////////       
	   var delay = 1000,
   percent = 0,
   percentStore = 0,
   tick = 1,
   tickStore = 1,
   tickDiff = 0,
   tickDiffpercent = 0;
function valBetween(v, min, max) {
   return Math.min(max, Math.max(min, v));
}
(function loop() {
   percent =Math.ceil((100*level)/tankcapacity);
   console.log(percent);
   $("#gauge-label").text(percent);
   
   if(percent>79 && status==1 ){
	autodisable();
		   }
if(percent<16  && status==0 && value!=0){
	   autoenable();
			   }    
			   value=1;
				   $("#gauge-label").text(percent);
	 tick = valBetween(Math.ceil((percent / 100) * 28), 1, 28);
   tickDiff = Math.abs(tick - tickStore);
   tickDiffpercent = Math.abs(percent - percentStore) / tickDiff;
   
   var counter = 0,
	   percentStoreTemp = percentStore,
	   tickStoreTemp = tickStore;
   if (percent > percentStore) {
	   for (i = tickStoreTemp; i <= tick; i++) {
		   (function (i) {
			   setTimeout(function () {
				   $("#guage").css(
					   "background-image",
					   "linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(" +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   ", " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   " 50%, #fff 50%)"
				   );
				   $("#gauge").css(
					   "box-shadow",
					   "0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   ", inset 0 0 2px -1px " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill
				   );
				   $("#gauge path:nth-child(" + i + ")").show();
				   $("#gauge-label")
					   .css("color", $("#gauge path:nth-child(" + i + ")")[0].style.fill)
					   .text(
						   Math.ceil(percentStoreTemp + tickDiffpercent * Math.abs(tickStoreTemp - i))
					   );
				   if (i == tick) {
	   $("#gauge-label").text(percent);
	   }
				   // console.log(i);
			   }, 50 * counter);
			   counter++;
		   })(i);
	   }
   } 
   else if (percent < percentStore) {
	   for (i = tickStoreTemp; i >= tick; i--) {
		   (function (i) {
			   setTimeout(function () {
				   $("#gauge").css(
					   "background-image",
					   "linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(" +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   ", " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   " 50%, #fff 50%)"
				   );
				   $("#gauge").css(
					   "box-shadow",
					   "0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill +
						   ", inset 0 0 2px -1px " +
						   $("#gauge path:nth-child(" + i + ")")[0].style.fill
				   );
				   $("#gauge path:nth-child(" + i + ")").hide();
				   $("#gauge-label")
					   .css("color", $("#gauge path:nth-child(" + i + ")")[0].style.fill)
					   .text(
						   Math.floor(percentStoreTemp - tickDiffpercent * Math.abs(tickStoreTemp - i))
					   );
				   if (i == tick) {
				   $("#gauge-label").text(percent);
   
				   }
				   // console.log(i);
			   }, 50 * counter);
			   counter++;
		   })(i);
	   }
   }
   percentStore = percent;
   tickStore = tick;
window.setTimeout(loop, delay);

})();

   