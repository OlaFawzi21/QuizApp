import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { instructorGuard } from 'src/app/core/guards/instructor/instructor.guard';
import { studentGuard } from 'src/app/core/guards/student/student.guard';
import { DashlistComponent } from './components/dashlist/dashlist.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboardList',
        pathMatch: 'full',
      },
      {
        path: 'dashboardList',
        component: DashlistComponent,
      },
      {
        path: 'instructor',
        canActivate: [instructorGuard],
        loadChildren: () =>
          import('./modules/instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
      },
      {
        path: 'student',
        canActivate: [studentGuard],
        loadChildren: () =>
          import('./modules/student/student.module').then((m) => m.StudentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
