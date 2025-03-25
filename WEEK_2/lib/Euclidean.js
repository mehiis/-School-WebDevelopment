/**
 * @param {number[2]} startPoint geoJSON array with lenght of two (cordinates x and y).
 * @param {number[2]} endPoint geoJSON array with lenght of two (cordinates x and y).
 * @returns distance between start and end points as a float.
 */

export function distance(startPoint, endPoint){
  return Math.sqrt(
    Math.pow(endPoint[0] - startPoint[0], 2) +
    Math.pow(endPoint[1] - startPoint[1], 2)
  );
}
