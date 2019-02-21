import { Injectable } from '@angular/core';

import { Repo } from "./repo";
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  URL = "https://api.github.com/search/repositories?q=";
  constructor(private http: HttpClient) { }
  emit: ReplaySubject<Repo[]> = new ReplaySubject()
  searchRepos(search: String) {
    return this.http.get<any>(this.URL + search).subscribe(res => {
      let repos: Repo[] = res.items.map(item => {
        let repo: Repo = {
          image: item.owner.avatar_url,
          name: item.name,
          desc: item.description,
          forks: item.forks,
          oissues: item.open_issues,
          link: item.html_url
        };
        return repo
      })
      return this.emit.next(repos)
    })
  }

}
