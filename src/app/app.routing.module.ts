import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovalsComponent } from "./components/approvals/approvals.component";
import { VideoComponent } from "./components/video/video.component";

const routes: Routes = [
    { path: 'approvals', component: ApprovalsComponent },
    { path: 'video/:id', component: VideoComponent }, 
    { path: '**', redirectTo: 'approvals' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  
  