"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var typeorm_1 = require("typeorm");
var Car = /** @class */ (function () {
    function Car() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Car.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", String)
    ], Car.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Car.prototype, "seats", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: false }) // Use decimal for numeric
        ,
        __metadata("design:type", Number)
    ], Car.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Car.prototype, "image", void 0);
    __decorate([
        (0, typeorm_1.Column)("json", { nullable: true }) // Use JSON for array data
        ,
        __metadata("design:type", Array)
    ], Car.prototype, "gallery", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Car.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Car.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Car.prototype, "updatedAt", void 0);
    Car = __decorate([
        (0, typeorm_1.Entity)({ name: "cars" })
    ], Car);
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=Car.js.map