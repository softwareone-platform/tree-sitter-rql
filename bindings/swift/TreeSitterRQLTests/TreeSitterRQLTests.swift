import XCTest
import SwiftTreeSitter
import TreeSitterRql

final class TreeSitterRqlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rql())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Rql grammar")
    }
}
