"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AldiwebsiteComponent = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AldiwebsiteComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-aldiwebsite',
            standalone: true,
            imports: [router_1.RouterLink, forms_1.FormsModule, http_1.HttpClientModule, common_1.CommonModule],
            templateUrl: './aldiwebsite.component.html',
            styleUrl: './aldiwebsite.component.scss',
            encapsulation: core_1.ViewEncapsulation.None
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _onResize_decorators;
    var AldiwebsiteComponent = _classThis = /** @class */ (function () {
        function AldiwebsiteComponent_1(platformId) {
            this.platformId = (__runInitializers(this, _instanceExtraInitializers), platformId);
            this.showSidebar = false;
            this.hexGrid = [];
            this.items = [
                {
                    img: '../../../assets/images/Implantacao.png',
                    title: 'Implantação de Soluções Personalizadas',
                    description: 'Implantação de soluções completas para que todos os departamentos operem com eficiência, utilizando módulos específicos do ERP.'
                },
                {
                    img: '../../../assets/images/Suporte.png',
                    title: 'Suporte Especializado',
                    description: 'Aqui, excelência e agilidade no atendimento são nossa prioridade, garantindo suporte especializado sempre que necessário.'
                },
                {
                    img: '../../../assets/images/Adequacao.png',
                    title: 'Adequação Fiscal',
                    description: 'Soluções TOTVS com base na legislação vigente, garantindo uma parametrização correta para o envio das obrigações fiscais.'
                },
                {
                    img: '../../../assets/images/Integracao.png',
                    title: 'Integração de Sistemas',
                    description: 'Oferecemos integrações complexas em um único software, unificando operações e otimizando performance.'
                },
                {
                    img: '../../../assets/images/Costumizacao.png',
                    title: 'Customizações Sob Medida',
                    description: 'Adapte o sistema às necessidades da sua empresa, ajustando-o de acordo com seus processos internos.'
                },
                {
                    img: '../../../assets/images/Manutencao.png',
                    title: 'Manutenção e Evolução',
                    description: 'Mantenha seu sistema sempre atualizado conforme as especificações da provedora e com o acompanhamento dos nossos especialistas.'
                }
            ];
            this.isBrowser = (0, common_1.isPlatformBrowser)(this.platformId);
        }
        AldiwebsiteComponent_1.prototype.toggleSidebar = function () {
            this.showSidebar = !this.showSidebar;
        };
        AldiwebsiteComponent_1.prototype.closeSidebar = function () {
            if (this.showSidebar) {
                this.showSidebar = false;
            }
        };
        AldiwebsiteComponent_1.prototype.ngOnInit = function () {
            if (this.isBrowser) {
                this.generateHexGrid();
            }
        };
        AldiwebsiteComponent_1.prototype.onResize = function () {
            if (this.isBrowser) {
                this.generateHexGrid();
            }
        };
        AldiwebsiteComponent_1.prototype.generateHexGrid = function () {
            if (!this.isBrowser)
                return;
            var hexWidth = 60;
            var hexHeight = 69;
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            var cols = Math.ceil(screenWidth / hexWidth);
            var rows = Math.ceil(screenHeight / (hexHeight * 0.75));
            this.hexGrid = Array.from({ length: rows }, function (_, rowIndex) {
                return Array.from({ length: cols }, function () { return ({
                    color: '#111'
                }); });
            });
        };
        AldiwebsiteComponent_1.prototype.changeColor = function (rowIndex, colIndex) {
            var _this = this;
            this.hexGrid[rowIndex][colIndex].color = '#944300';
            setTimeout(function () {
                _this.hexGrid[rowIndex][colIndex].color = '#111';
            }, 1000);
        };
        return AldiwebsiteComponent_1;
    }());
    __setFunctionName(_classThis, "AldiwebsiteComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _onResize_decorators = [(0, core_1.HostListener)('window:resize')];
        __esDecorate(_classThis, null, _onResize_decorators, { kind: "method", name: "onResize", static: false, private: false, access: { has: function (obj) { return "onResize" in obj; }, get: function (obj) { return obj.onResize; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AldiwebsiteComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AldiwebsiteComponent = _classThis;
}();
exports.AldiwebsiteComponent = AldiwebsiteComponent;
