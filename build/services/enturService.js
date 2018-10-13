"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.formatTrip = void 0;

require("@babel/polyfill");

var _sdk = _interopRequireWildcard(require("@entur/sdk"));

var _places = _interopRequireDefault(require("../constants/places"));

var _formatter = _interopRequireWildcard(require("../utils/formatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var service = new _sdk.default({
  clientName: 'sindrem-slackbot'
});
var api = {};

function getTripPatterns(_x, _x2) {
  return _getTripPatterns.apply(this, arguments);
}

function _getTripPatterns() {
  _getTripPatterns = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(from, to) {
    var _ref, _ref2, fromFeature, _ref3, _ref4, toFeature, _ref5, _ref6, tripPatterns;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return service.getFeatures(from);

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            fromFeature = _ref2[0];
            _context.next = 7;
            return service.getFeatures(to, {
              latitude: 59.914735,
              longitude: 10.730304
            });

          case 7:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            toFeature = _ref4[0];

            if (fromFeature) {
              _context.next = 12;
              break;
            }

            throw new Error("Fant ingen egenskaper for fra-destinasjon: ".concat(from));

          case 12:
            if (toFeature) {
              _context.next = 14;
              break;
            }

            throw new Error("Fant ingen egenskaper for til-destinasjon: ".concat(to));

          case 14:
            _context.next = 16;
            return service.getTripPatterns({
              searchDate: new Date(),
              from: (0, _sdk.convertFeatureToLocation)(fromFeature),
              to: (0, _sdk.convertFeatureToLocation)(toFeature)
            });

          case 16:
            _ref5 = _context.sent;
            _ref6 = _slicedToArray(_ref5, 1);
            tripPatterns = _ref6[0];
            return _context.abrupt("return", tripPatterns);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getTripPatterns.apply(this, arguments);
}

var formatTrip = function formatTrip(trip) {
  var startTime = (0, _formatter.formatTime)(trip.startTime);
  var endTime = (0, _formatter.formatTime)(trip.endTime);
  var duration = Math.round(trip.duration / 60, 2);
  var from = trip.legs[0].fromPlace.name;
  var to = trip.legs[trip.legs.length - 1].toPlace.name;
  var stasjonerUnderveis = (0, _formatter.default)(trip);
  return "Du m\xE5 g\xE5 kl. ".concat(startTime, " for \xE5 rekke T-banen fra ").concat(from, ". Det tar ca. ").concat(duration, " minutter og du er fremme ved ").concat(to, " kl. ").concat(endTime, "\nStasjoner underveis: ").concat(stasjonerUnderveis);
}; // const { to, from } = places.til_hjem_fra_nationaltheateret;
// getTripPatterns(from, to).then(data => console.log(formatTrip(data)));


exports.formatTrip = formatTrip;
api.getTripPatterns = getTripPatterns;
var _default = api;
exports.default = _default;