import {
  Component, ComponentFactoryResolver, ComponentRef, Input,
  OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'select-framework-widget',
  template: `<div #widgetContainer></div>`,
})
export class SelectFrameworkComponent implements OnChanges, OnInit {
  newComponent: ComponentRef<any> = null;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  @Input() data: any;
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;

  constructor(
      private componentFactory: ComponentFactoryResolver,
      private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  updateComponent() {
    if (!this.newComponent && this.jsf.framework) {
      this.newComponent = this.widgetContainer.createComponent(
          this.componentFactory.resolveComponentFactory(this.jsf.framework)
      );
    }
    if (this.newComponent) {
      for (let input of ['formID', 'layoutNode', 'layoutIndex', 'dataIndex', 'data']) {
        this.newComponent.instance[input] = this[input];
      }
    }
  }
}