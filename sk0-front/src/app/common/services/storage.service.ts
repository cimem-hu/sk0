import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private readonly key = "token";
  constructor(private readonly storage: Storage) {
    this.storage.create();
  }

  async saveToken(token: string) {
    await this.storage.set(this.key, token);
  }

  async tokenGetter() {
    const token = await this.storage.get(this.key);
    return token;
  }

  async removeToken() {
    this.storage.remove(this.key);
  }
}
