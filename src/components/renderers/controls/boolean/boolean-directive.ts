import {AbstractControl, schemaTypeIs} from '../abstract-control';

class BooleanDirective implements ng.IDirective {
    restrict = 'E';
    templateUrl = 'boolean.html';
    controller = BooleanController;
    controllerAs = 'vm';
}
interface BooleanControllerScope extends ng.IScope {
}

class BooleanController extends AbstractControl {
    static $inject = ['$scope', 'PathResolver'];
    constructor(scope: BooleanControllerScope) {
        super(scope);
    }
}

const booleanTemplate = `<jsonforms-control>
  <input type="checkbox"
         id="{{vm.id}}"
         class="jsf-control-boolean"
         ng-model="vm.modelValue[vm.fragment]"
         ng-change='vm.modelChanged()'
         ng-disabled="vm.uiSchema.readOnly"/>
</jsonforms-control>`;

export default angular
    .module('jsonforms.renderers.controls.boolean', ['jsonforms.renderers.controls'])
    .directive('booleanControl', () => new BooleanDirective())
    .run(['RendererService', RendererService =>
        RendererService.register('boolean-control', schemaTypeIs('boolean'), 1)
    ])
    .run(['$templateCache', $templateCache => {
        $templateCache.put('boolean.html', booleanTemplate);
    }])
    .name;
