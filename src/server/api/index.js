module.exports = function api() {
  this.body = {
    payload: this.request.body
  }
}
