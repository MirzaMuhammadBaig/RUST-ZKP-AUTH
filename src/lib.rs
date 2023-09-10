// src/lib.rs

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn check_value(assigned_value: &str, parameter_value: &str) -> bool {
    assigned_value == parameter_value
}

// ... other Rust code ...
