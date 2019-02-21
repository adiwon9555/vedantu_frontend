import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';

import { Repo } from './repo';
import { GitService } from './git.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public repos: Repo[];
  public search = "";
  constructor(private gitService: GitService) {

  }
  ngOnInit() {
    this.gitService.emit.subscribe(data=>this.repos=data)
    
  }
  searchRepos() {
    this.repos = null;
    this.gitService.searchRepos(this.search)
  };

}

