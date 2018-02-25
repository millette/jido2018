'use strict'

var mapEl = document.getElementById('mapid')
mapEl.style.height = Math.round(mapEl.clientWidth * (0.618 / 2)) + 'px'

var mymap = window.L.map(mapEl)
window.L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(mymap)

var $nevenements = document.getElementById('nevenements')
var $nparticipants = document.getElementById('nparticipants')

var geoLayer

var arrayMin = function arrayMin(l) {
  return l && l.length && Math.min.apply(null, l);
};

var arrayMax = function arrayMax(l) {
  return l && l.length && Math.max.apply(null, l);
};

var getBounds = function getBounds(geo) {
  if (!geo) { return false }

  var y = geo.map(function (z) {
    return z.geometry.coordinates;
  }).filter(Boolean);

  var lngs = y.map(function (z) {
    return z[0];
  });

  var lats = y.map(function (z) {
    return z[1];
  });

  return lngs.length && lats.length && [[arrayMin(lats), arrayMin(lngs)], [arrayMax(lats), arrayMax(lngs)]];
};

var yo = function () {
  return window.fetch('/jido2018.json')
    .then(function (res) {
      return res.ok ? res.json() : false;
    })
    .then(function (geo) {
      var nParticipantsTotal = geo.features
        .map(function (x) { return Math.min(100000, x.properties.nParticipants) || 0 })
        .reduce(function (a, v) { return a + v }, 0)

      $nevenements.innerText = geo.features.length
      $nparticipants.innerText = nParticipantsTotal

      var attribution = 'Données &copy; <a href="https://opendataday.org/">Open Data Day</a> 2018';
      if (geoLayer) {
        geoLayer.remove();
      }
      geoLayer = window.L.geoJSON(geo, { attribution: attribution })
        .bindPopup(function (layer) {
          var ret = []
          if (layer.feature.properties.program) { ret.push(layer.feature.properties.program) }
          if (layer.feature.properties.place) { ret.push('@ ' + layer.feature.properties.place) }
          if (layer.feature.properties.url) { ret.push('<b><a href="' + layer.feature.properties.url + '">WWW</a></b>') }
          if (layer.feature.properties.organizers) { ret.push(layer.feature.properties.organizers) }
          if (layer.feature.properties.nParticipants) { ret.push(layer.feature.properties.nParticipants + ' participants') }
          return ret.join('<br>')
        })
        .addTo(mymap);
    })
    .then(function (bounds) {
      if (!mymap.getZoom()) {
        mymap.setView([45.75, -74], 5);
      }
    })
}

yo()


var $date = document.querySelector('.date')
var $tocUl = document.querySelector('#TOC > ul')
var $countdown = document.createElement('b')
$date.appendChild($countdown)
$tocUl.classList.add('menu-list')

var countDownDate = new Date(2018, 2, 3, 12, 30).getTime()

var updateCountdown = function () {
  var countdownText = [' — dans moins de']
  var daysDecimal = (countDownDate - Date.now()) / 86400000
  var days = Math.floor(daysDecimal)
  var hours = Math.ceil(24 * (daysDecimal - days))

  if (hours === 24) {
    hours = 0
    ++days
  }

  if (days > 0) {
    countdownText.push(days)
    countdownText.push(days > 1 ? 'jours' : 'jour')
    if (hours) { countdownText.push('et') }
  }

  if (hours > 0) {
    countdownText.push(hours)
    countdownText.push(hours > 1 ? 'heures' : 'heure')
  }

  if (hours > 0 || days > 0) {
    $countdown.innerText = countdownText.join(' ')
    setTimeout(updateCountdown, 5 * 60 * 1000)
  }
}

updateCountdown()

if (typeof setActiveStyleSheet === 'function') {
  var $toc = document.querySelector('#TOC')
  var $rym = document.querySelector('.rym-sticky')
  var $before = document.querySelector('.rym-sticky > :first-child')
  var $field = document.createElement('div')
  var $defaultStyle = document.createElement('button')
  var $altStyle = document.createElement('button')
  var $titre = document.createElement('i')

  $titre.innerText = 'Sélecteur de thème'

  $field.classList.add('buttons')
  $field.classList.add('is-centered')
  $field.classList.add('box')

  $defaultStyle.innerText = 'Night mode'
  $defaultStyle.classList.add('button')
  $defaultStyle.classList.add('is-primary')
  $defaultStyle.classList.add('is-outlined')
  $defaultStyle.classList.add('is-small')

  $altStyle.innerText = 'Day mode'
  $altStyle.classList.add('button')
  $altStyle.classList.add('is-success')
  $altStyle.classList.add('is-outlined')
  $altStyle.classList.add('is-small')

  $field.appendChild($defaultStyle)
  $field.appendChild($altStyle)
  $field.appendChild($titre)
  // $toc.appendChild($field)

  // parentNode.insertBefore(newNode, referenceNode);
  $rym.insertBefore($field, $before)

  $defaultStyle.addEventListener('click', function (ev) {
    ev.preventDefault()
    setActiveStyleSheet('Night mode')
  })

  $altStyle.addEventListener('click', function (ev) {
    ev.preventDefault()
    setActiveStyleSheet('Day mode')
  })
}
