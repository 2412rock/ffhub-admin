import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovalsComponent } from "./components/approvals/approvals.component";

const routes: Routes = [
    { path: 'approvals', component: ApprovalsComponent },

  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  
  