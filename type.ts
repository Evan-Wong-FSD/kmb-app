export interface Stop {
  stop: string;
  name_en: string;
  name_tc: string;
  name_sc: string;
  lat: string;
  long: string;
}

export interface StopETA {
  co: string;
  route: string;
  dir: string;
  service_type: number;
  seq: number;
  dest_tc: string;
  dest_sc: string;
  dest_en: string;
  eta_seq: number;
  eta: string;
  rmk_tc: string;
  rmk_sc: string;
  rmk_en: string;
  data_timestamp: string,
  stopId: string,
  id: string
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RouteStop {
  route: string;
  bound: string;
  service_type: string;
  seq: string;
  stop: string;
}

export interface RouteEtaToStop {
  id?: string;
  stopId: string;
  etas: number[];
}

export interface ETA {
  co: string;
  data_timestamp: string;
  dest_en: string;
  dest_sc: string;
  dest_tc: string;
  dir: string;
  eta: string;
  eta_seq: number;
  rmk_en: string;
  rmk_sc: string;
  rmk_tc: string;
  route: string;
  seq: number;
  service_type: number;
}

export interface Location {
  coords: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
}