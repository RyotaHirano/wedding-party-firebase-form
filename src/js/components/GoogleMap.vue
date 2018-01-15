<template>
  <ul class="acccess-information">
    <li>
      <div class="label title">DAY</div>
      <div class="item">2017/12/3(sun)</div>
    </li>
    <li>
      <div class="label title">PLACE</div>
      <div class="item">
        <p>Grand Hyatt Tokyo</p>
      </div>
    </li>
    <li class="map">
      <div id="map" class="map"></div>
      <a href="https://maps.google.com/?q=Grand Hyatt Tokyo" target="_blank" class="button title">GoogleMap</a>
    </li>
    <li>
      <div class="label title">START</div>
      <div class="item">19:00</div>
    </li>
    <li>
      <div class="label title">END</div>
      <div class="item">21:00</div>
    </li>
    <li>
      <div class="label title">FEE(yen)</div>
      <div class="item">5,000</div>
    </li>
  </ul>
</template>

<script>
  import google from 'gl'
  const mapStyle = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#444444"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#dde6e8"
        },
        {
          "visibility": "on"
        }
      ]
    }
  ]
  const target = {lat: 35.659592, lng: 139.729072}

  export default {
    mounted: function() {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: target,
        styles: mapStyle
      })
      new google.maps.Marker({
        position: target,
        map: map
      })
      new google.maps.event.addDomListener(window, "resize", function() {
        const center = map.getCenter()
        google.maps.event.trigger(map, "resize")
        map.setCenter(center)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .acccess-information {
    margin: 0 auto;
    border-bottom: 1px solid #ddd;

    > li {
      padding: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-top: 1px solid #ddd;

      &.map {
        padding: 0 0 32px;
        border: 0;
        flex-flow: column;
        
        > .button {
          margin-top: 20px;
          display: block;
          width: 200px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          position: relative;
          color: #fff;
          background-color: #1d4687;
        }
      }

      > .label {
        width: 260px;
        color: #d94a37;
      }

      > .item {
        font-weight: bold;
      }

      > .map {
        width: 100%;
        height: 440px;
      }
    }

    @media screen and (max-width: 959px) {
      > li {
        padding: 16px;
        font-size: .8rem;

        &.map {
          padding: 0 0 16px;

          > .button {
            width: 100%;
            max-width: 240px;
          }
        }

        > .label {
          width: 35%;
          min-width: 60px;
        }

        > .map {
          height: 220px;
        }
      }
    }
  }
</style>