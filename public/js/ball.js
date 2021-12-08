class Ball {
  posx;
  posy;
  speed;

  constructor(radius, color, posx, posy, speedx, speedy) {
    this.radius = radius;
    this.color = color;
    this.posx = posx;
    this.posy = posy;
    this.speedx = speedx;
    this.speedy = speedy;
  }

  SetPos(posx, posy) {
    this.posx = posx;
    this.posy = posy;
  }

  GetPos() {
    return [this.posx, this.posy];
  }

  SetSpeedx(speedx) {
    this.speedx = speedx;
  }

  SetSpeedy(speedy) {
    this.speedy = speedy;
  }

  GetSpeed() {
    return [this.speedx, this.speedy];
  }
}