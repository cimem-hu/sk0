import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private readonly key = "token";
  constructor(private readonly storage: Storage) {}

  async saveToken(token: string) {
    await this.storage.set(this.key, token);
  }

  async tokenGetter() {
    return await this.storage.get(this.key);
  }

  async removeToken() {
    this.storage.remove(this.key);
  }
}