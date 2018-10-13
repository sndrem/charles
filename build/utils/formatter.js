"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.formatTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatTime = function formatTime(time) {
  return (0, _moment.default)(time).format('H:mm');
};

exports.formatTime = formatTime;

var formaterStasjonerUnderveis = function formaterStasjonerUnderveis(trip) {
  var response = trip.legs.map(function (leg) {
    if (leg.mode.includes('metro')) {
      return leg.intermediateEstimatedCalls.map(function (call) {
        var quay = call.quay;
        return "".concat(quay.name, " (").concat(formatTime(call.expectedArrivalTime), ")");
      }).join(' - ');
    }

    return null;
  }).filter(function (elem) {
    return elem !== null;
  });
  return response;
};

var _default = formaterStasjonerUnderveis;
exports.default = _default;