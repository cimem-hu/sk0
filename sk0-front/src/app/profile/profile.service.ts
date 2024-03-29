import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import {
  ProfileUpdateRequest,
  ProfileUpdateResponse
} from "./store/profile.actions";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  update(id: number, profileUpdateDto: ProfileUpdateRequest) {
    return this.http.patch<ProfileUpdateResponse>(
      `${environment.baseUrl}/users/${id}`,
      profileUpdateDto
    );
  }
}
