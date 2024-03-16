import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ProfileUpdateRequest } from "./store/profile.actions";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  update(id: number, profileUpdateDto: ProfileUpdateRequest) {
    return this.http.patch(
      `${environment.baseUrl}/users/${id}`,
      profileUpdateDto
    );
  }
}
