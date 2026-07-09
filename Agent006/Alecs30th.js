var c1Lat = 45.538;
var c1Lon = -73.55;
var superCLat = 45.525;
var superCLon = -73.550;
/*
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    window.location="https://mattjovani.github.io/AgentPhoenix/Emmas30th.html";
  }
}

function success(position) {
  if(position.coords.latitude.toFixed(3)== c1Lat && position.coords.longitude.toFixed(3)== c1Lon){
     window.location="https://docs.google.com/document/d/1L9qv8rD1v9fWatf_ph-Z9D_RqQuHtk-UWM0Hmyky78M/edit?usp=drivesdk";
  } else {
  alert("latitude= " + position.coords.latitude.toFixed(3) + " → " + c1Lat + "\nlongitude= " + position.coords.longitude.toFixed(3) + " → " + c1Lon);   window.location="https://docs.google.com/document/d/1kI3wvw9Vat3h4Zdbs-0UwvTBL5O1mAoQg8fIuY9hg-o/edit?usp=drivesdk";
     
  }
}

function error() {
  alert("Sorry, no position available.");
}
*/

function getMyLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true }
    );
  });
}

function getHaversineDistance(point1, point2) {
  const R = 6371; 
  
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  
  const lat1Rad = point1.lat * Math.PI / 180;
  const lat2Rad = point2.lat * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * 
            Math.cos(lat1Rad) * Math.cos(lat2Rad);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

function isInsideRadius(center, target, radiusInKm) {
  const distance = getHaversineDistance(center, target);
  return distance <= radiusInKm;
}

async function checkProximity(targetPosition, allowedRadiusKm, goodDoc, badDoc) {
  try {
    
    const myLocation = await getMyLocation();
    
    const inside = isInsideRadius(myLocation, targetPosition, allowedRadiusKm);
    
    if (inside) {
      window.location=goodDoc;
    } else {
      window.location=badDoc;
    }
  } catch (error) {
    alert("Error getting location:", error.message);
  }
}