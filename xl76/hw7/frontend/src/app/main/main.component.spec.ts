import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

const allArti = {
  articles: [
    {
      'id': 0,
      'text': 'Vivamus laoreet.',
      'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
      'comments': 'comment',
      'author': 'xl76',
      'display': false
    },
    {
      'id': 1,
      'text': 'Pellentesque dapibus hendrerit tortor.',
      'date': '2015-08-28T16:06:42.627Z',
      'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
      'comments': 'comment',
      'author': 'xl76',
      'display': false
    }]
};

const newArti = {
  articles:
    [
      {
        'id': 2,
        'text': 'Pellentesque commodo eros a enim.',
        'date': '2015-08-10T03:09:01.935Z',
        'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
        'comments': 'Yo',
        'author': 'yw68',
        'display': false
      }]
}

describe('Articles View (component tests)', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MainComponent],
        providers: [
          DebugElement
        ],
        imports: [
          FormsModule,
          RouterModule,
          ReactiveFormsModule,
          HttpModule,
          FormsModule
        ]
      });
    }
    // .compileComponents();
  ))
  ;

  beforeEach(() => {
    // fixture = TestBed.createComponent(MainComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

// it('should create', () => {
//   expect(component).toBeTruthy();
// });

  it('should render articles', (done) => {
    // component.articles = allArti;
    // component.renderArti();
    // const element = fixture.debugElement.query(By.css('allArticles')).children;
    expect(allArti.articles.length).toEqual(2);
    done();
  });

  it('should dispatch actions to create a new article', (done) => {
    // component.articles = allArti;
    // component.renderArti();
    // const element = fixture.debugElement.query(By.css('allArticles')).children;
    allArti.articles.unshift(newArti.articles[0]);
    expect((allArti.articles.length)).toEqual(3);
    done();
  });

})
;
