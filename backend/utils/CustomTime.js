class CustomTime {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  // Custom time-specific methods
  // ...

  // Convert to a standard JavaScript Date object
  toDate() {
    const date = new Date();
    date.setHours(this.hours);
    date.setMinutes(this.minutes);
    date.setSeconds(this.seconds);
    return date;
  }
}

module.exports = CustomTime;